<?php

require_once __DIR__ . '/../core/Controller.php';
require_once __DIR__ . '/../models/CartModel.php';
require_once __DIR__ . '/../models/ProductModel.php';

class CartController extends Controller {
    private $cartModel;
    private $productModel;
    
    public function __construct() {
        $this->cartModel = new CartModel();
        $this->productModel = new ProductModel();
    }
    
    private function getCartIdentifier() {
        $user = $this->getCurrentUser();
        
        if ($user) {
            return ['user_id' => $user['user_id'], 'session_id' => null];
        } else {
            // Use session ID for guest users
            $sessionId = $_SERVER['HTTP_X_SESSION_ID'] ?? session_id();
            return ['user_id' => null, 'session_id' => $sessionId];
        }
    }
    
    public function index($params = []) {
        try {
            $identifier = $this->getCartIdentifier();
            $summary = $this->cartModel->getCartSummary($identifier['user_id'], $identifier['session_id']);
            
            $this->successResponse($summary);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch cart: ' . $e->getMessage(), 500);
        }
    }
    
    public function addItem($params = []) {
        try {
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['product_id'];
            $this->validateRequired($data, $required);
            
            $productId = (int)$data['product_id'];
            $quantity = isset($data['quantity']) ? (int)$data['quantity'] : 1;
            
            // Validate quantity
            if ($quantity <= 0) {
                $this->errorResponse('Quantity must be greater than 0', 422);
            }
            
            // Check if product exists and is available
            $product = $this->productModel->getById($productId);
            if (!$product) {
                $this->errorResponse('Product not found', 404);
            }
            
            if (!$product['is_active'] || !$product['in_stock']) {
                $this->errorResponse('Product is not available', 422);
            }
            
            $identifier = $this->getCartIdentifier();
            
            // Add item to cart
            $this->cartModel->addItem($productId, $quantity, $identifier['user_id'], $identifier['session_id']);
            
            // Return updated cart summary
            $summary = $this->cartModel->getCartSummary($identifier['user_id'], $identifier['session_id']);
            
            $this->successResponse($summary, 'Item added to cart successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to add item to cart: ' . $e->getMessage(), 500);
        }
    }
    
    public function updateItem($params) {
        try {
            $itemId = (int)$params['id'];
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['quantity'];
            $this->validateRequired($data, $required);
            
            $quantity = (int)$data['quantity'];
            
            // Validate quantity
            if ($quantity < 0) {
                $this->errorResponse('Quantity cannot be negative', 422);
            }
            
            $identifier = $this->getCartIdentifier();
            
            // Update item quantity
            $updated = $this->cartModel->updateItemQuantity($itemId, $quantity);
            
            if ($updated) {
                // Return updated cart summary
                $summary = $this->cartModel->getCartSummary($identifier['user_id'], $identifier['session_id']);
                
                $message = $quantity > 0 ? 'Item updated successfully' : 'Item removed from cart';
                $this->successResponse($summary, $message);
            } else {
                $this->errorResponse('Failed to update item', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to update cart item: ' . $e->getMessage(), 500);
        }
    }
    
    public function removeItem($params) {
        try {
            $itemId = (int)$params['id'];
            $identifier = $this->getCartIdentifier();
            
            // Remove item from cart
            $removed = $this->cartModel->removeItem($itemId, $identifier['user_id'], $identifier['session_id']);
            
            if ($removed) {
                // Return updated cart summary
                $summary = $this->cartModel->getCartSummary($identifier['user_id'], $identifier['session_id']);
                
                $this->successResponse($summary, 'Item removed from cart successfully');
            } else {
                $this->errorResponse('Failed to remove item', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to remove cart item: ' . $e->getMessage(), 500);
        }
    }
    
    public function clearCart($params = []) {
        try {
            $identifier = $this->getCartIdentifier();
            
            // Clear cart
            $cleared = $this->cartModel->clearCart($identifier['user_id'], $identifier['session_id']);
            
            if ($cleared) {
                $this->successResponse(null, 'Cart cleared successfully');
            } else {
                $this->errorResponse('Cart is already empty', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to clear cart: ' . $e->getMessage(), 500);
        }
    }
    
    public function validateCart($params = []) {
        try {
            $identifier = $this->getCartIdentifier();
            $issues = $this->cartModel->validateCartItems($identifier['user_id'], $identifier['session_id']);
            
            $response = [
                'valid' => empty($issues),
                'issues' => $issues
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to validate cart: ' . $e->getMessage(), 500);
        }
    }
    
    public function transferCart($params = []) {
        try {
            $user = $this->requireAuth();
            $data = $this->getJsonInput();
            
            $sessionId = $data['session_id'] ?? null;
            
            if (!$sessionId) {
                $this->errorResponse('Session ID required', 422);
            }
            
            // Transfer session cart to user
            $this->cartModel->transferSessionCart($sessionId, $user['user_id']);
            
            // Return updated cart summary
            $summary = $this->cartModel->getCartSummary($user['user_id'], null);
            
            $this->successResponse($summary, 'Cart transferred successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to transfer cart: ' . $e->getMessage(), 500);
        }
    }
    
    public function getCartCount($params = []) {
        try {
            $identifier = $this->getCartIdentifier();
            $items = $this->cartModel->getCartItems($identifier['user_id'], $identifier['session_id']);
            
            $totalItems = 0;
            foreach ($items as $item) {
                $totalItems += $item['quantity'];
            }
            
            $this->successResponse(['count' => $totalItems]);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to get cart count: ' . $e->getMessage(), 500);
        }
    }
}
