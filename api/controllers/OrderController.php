<?php

require_once __DIR__ . '/../core/Controller.php';
require_once __DIR__ . '/../models/OrderModel.php';
require_once __DIR__ . '/../models/CartModel.php';
require_once __DIR__ . '/../models/ProductModel.php';

class OrderController extends Controller {
    private $orderModel;
    private $cartModel;
    private $productModel;
    
    public function __construct() {
        $this->orderModel = new OrderModel();
        $this->cartModel = new CartModel();
        $this->productModel = new ProductModel();
    }
    
    public function index($params = []) {
        try {
            $user = $this->getCurrentUser();
            
            $filters = [
                'status' => $_GET['status'] ?? null,
                'payment_status' => $_GET['payment_status'] ?? null,
                'date_from' => $_GET['date_from'] ?? null,
                'date_to' => $_GET['date_to'] ?? null,
                'search' => $_GET['search'] ?? null,
                'order_by' => $_GET['order_by'] ?? 'created_at',
                'order_dir' => $_GET['order_dir'] ?? 'DESC'
            ];
            
            // If not admin, only show user's orders
            if (!$user || $user['role'] !== 'admin') {
                if (!$user) {
                    $this->errorResponse('Authentication required', 401);
                }
                $filters['user_id'] = $user['user_id'];
            }
            
            $pagination = $this->getPaginationParams();
            $filters['limit'] = $pagination['limit'];
            $filters['offset'] = $pagination['offset'];
            
            $orders = $this->orderModel->getOrders($filters);
            
            // Get total count for pagination
            $totalFilters = $filters;
            unset($totalFilters['limit'], $totalFilters['offset']);
            $total = $this->orderModel->count();
            
            $response = [
                'orders' => $orders,
                'pagination' => [
                    'current_page' => $pagination['page'],
                    'per_page' => $pagination['limit'],
                    'total' => $total,
                    'total_pages' => ceil($total / $pagination['limit'])
                ]
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch orders: ' . $e->getMessage(), 500);
        }
    }
    
    public function show($params) {
        try {
            $orderId = $params['id'];
            $user = $this->getCurrentUser();
            
            $order = $this->orderModel->getOrderWithItems($orderId);
            
            if (!$order) {
                $this->errorResponse('Order not found', 404);
            }
            
            // Check if user can access this order
            if ($user && $user['role'] !== 'admin' && $order['user_id'] != $user['user_id']) {
                $this->errorResponse('Access denied', 403);
            }
            
            $this->successResponse($order);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch order: ' . $e->getMessage(), 500);
        }
    }
    
    public function store($params = []) {
        try {
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['customer_name', 'customer_email', 'customer_phone', 'shipping_address', 'payment_method'];
            $this->validateRequired($data, $required);
            
            // Validate email
            if (!filter_var($data['customer_email'], FILTER_VALIDATE_EMAIL)) {
                $this->errorResponse('Invalid email format', 422);
            }
            
            // Get cart items
            $user = $this->getCurrentUser();
            $cartItems = [];
            
            if (isset($data['cart_items']) && !empty($data['cart_items'])) {
                // Direct cart items provided (for API orders)
                foreach ($data['cart_items'] as $item) {
                    $product = $this->productModel->getById($item['product_id']);
                    if (!$product || !$product['is_active'] || !$product['in_stock']) {
                        $this->errorResponse("Product {$item['product_id']} is not available", 422);
                    }
                    
                    $cartItems[] = [
                        'product_id' => $product['id'],
                        'product_name' => $product['name'],
                        'product_price' => $product['price'],
                        'quantity' => $item['quantity'],
                        'total_price' => $product['price'] * $item['quantity']
                    ];
                }
            } else {
                // Get from user's cart
                $cartIdentifier = $user ? ['user_id' => $user['user_id'], 'session_id' => null] 
                                       : ['user_id' => null, 'session_id' => $data['session_id'] ?? null];
                
                $cartSummary = $this->cartModel->getCartSummary($cartIdentifier['user_id'], $cartIdentifier['session_id']);
                
                if (empty($cartSummary['items'])) {
                    $this->errorResponse('Cart is empty', 422);
                }
                
                // Validate cart items
                $issues = $this->cartModel->validateCartItems($cartIdentifier['user_id'], $cartIdentifier['session_id']);
                if (!empty($issues)) {
                    $this->errorResponse('Cart has invalid items', 422, ['cart_issues' => $issues]);
                }
                
                foreach ($cartSummary['items'] as $item) {
                    $cartItems[] = [
                        'product_id' => $item['product_id'],
                        'product_name' => $item['name'],
                        'product_price' => $item['price'],
                        'quantity' => $item['quantity'],
                        'total_price' => $item['price'] * $item['quantity']
                    ];
                }
            }
            
            // Calculate totals
            $subtotal = array_sum(array_column($cartItems, 'total_price'));
            $shippingFee = $this->calculateShippingFee($subtotal);
            $discount = $data['discount'] ?? 0;
            $totalAmount = $subtotal + $shippingFee - $discount;
            
            // Prepare order data
            $orderData = [
                'user_id' => $user ? $user['user_id'] : null,
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'shipping_address' => $data['shipping_address'],
                'city' => $data['city'] ?? null,
                'district' => $data['district'] ?? null,
                'postal_code' => $data['postal_code'] ?? null,
                'subtotal' => $subtotal,
                'shipping_fee' => $shippingFee,
                'discount' => $discount,
                'total_amount' => $totalAmount,
                'payment_method' => $data['payment_method'],
                'payment_status' => 'pending',
                'status' => 'pending',
                'notes' => $data['notes'] ?? null
            ];
            
            // Create order
            $orderId = $this->orderModel->createOrder($orderData, $cartItems);
            
            // Clear cart if order created from user cart
            if (!isset($data['cart_items'])) {
                $cartIdentifier = $user ? ['user_id' => $user['user_id'], 'session_id' => null] 
                                       : ['user_id' => null, 'session_id' => $data['session_id'] ?? null];
                $this->cartModel->clearCart($cartIdentifier['user_id'], $cartIdentifier['session_id']);
            }
            
            // Get created order with items
            $order = $this->orderModel->getOrderWithItems($orderId);
            
            $this->successResponse($order, 'Order created successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to create order: ' . $e->getMessage(), 500);
        }
    }
    
    public function update($params) {
        try {
            $this->requireAdmin();
            
            $orderId = $params['id'];
            $data = $this->getJsonInput();
            
            // Check if order exists
            $order = $this->orderModel->getById($orderId);
            if (!$order) {
                $this->errorResponse('Order not found', 404);
            }
            
            $updated = $this->orderModel->update($orderId, $data);
            
            if ($updated) {
                $order = $this->orderModel->getOrderWithItems($orderId);
                $this->successResponse($order, 'Order updated successfully');
            } else {
                $this->errorResponse('No changes made', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to update order: ' . $e->getMessage(), 500);
        }
    }
    
    public function delete($params) {
        try {
            $this->requireAdmin();
            
            $orderId = $params['id'];
            
            // Check if order exists
            $order = $this->orderModel->getById($orderId);
            if (!$order) {
                $this->errorResponse('Order not found', 404);
            }
            
            // Only allow deletion of pending orders
            if ($order['status'] !== 'pending') {
                $this->errorResponse('Cannot delete non-pending orders', 422);
            }
            
            $deleted = $this->orderModel->delete($orderId);
            
            if ($deleted) {
                $this->successResponse(null, 'Order deleted successfully');
            } else {
                $this->errorResponse('Failed to delete order', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to delete order: ' . $e->getMessage(), 500);
        }
    }
    
    public function getUserOrders($params) {
        try {
            $userId = (int)$params['userId'];
            $user = $this->requireAuth();
            
            // Users can only view their own orders, admins can view any
            if ($user['role'] !== 'admin' && $user['user_id'] != $userId) {
                $this->errorResponse('Access denied', 403);
            }
            
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
            $orders = $this->orderModel->getUserOrders($userId, $limit);
            
            $this->successResponse($orders);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch user orders: ' . $e->getMessage(), 500);
        }
    }
    
    private function calculateShippingFee($subtotal) {
        $settingsModel = new SettingsModel();
        $shippingFee = $settingsModel->getSetting('shipping_fee', 50000);
        $freeShippingThreshold = $settingsModel->getSetting('free_shipping_threshold', 1000000);
        
        return $subtotal >= $freeShippingThreshold ? 0 : $shippingFee;
    }
    
    public function getStats($params = []) {
        try {
            $this->requireAdmin();
            
            $stats = $this->orderModel->getOrderStats();
            $revenueData = $this->orderModel->getRevenueByPeriod('month', 12);
            $topProducts = $this->orderModel->getTopSellingProducts(10);
            
            $response = [
                'overview' => $stats,
                'revenue_by_month' => $revenueData,
                'top_products' => $topProducts
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch order stats: ' . $e->getMessage(), 500);
        }
    }
}
