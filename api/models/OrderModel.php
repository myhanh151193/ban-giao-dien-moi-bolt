<?php

require_once __DIR__ . '/../core/Model.php';

class OrderModel extends Model {
    protected $table = 'orders';
    
    public function createOrder($orderData, $orderItems) {
        try {
            $this->db->beginTransaction();
            
            // Generate order ID
            $orderData['id'] = $this->generateOrderId();
            
            // Create order
            $sql = "INSERT INTO orders (id, user_id, customer_name, customer_email, customer_phone, 
                    shipping_address, city, district, postal_code, subtotal, shipping_fee, discount, 
                    total_amount, payment_method, payment_status, status, notes) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $params = [
                $orderData['id'],
                $orderData['user_id'] ?? null,
                $orderData['customer_name'],
                $orderData['customer_email'],
                $orderData['customer_phone'],
                $orderData['shipping_address'],
                $orderData['city'] ?? null,
                $orderData['district'] ?? null,
                $orderData['postal_code'] ?? null,
                $orderData['subtotal'],
                $orderData['shipping_fee'],
                $orderData['discount'] ?? 0,
                $orderData['total_amount'],
                $orderData['payment_method'],
                $orderData['payment_status'] ?? 'pending',
                $orderData['status'] ?? 'pending',
                $orderData['notes'] ?? null
            ];
            
            $this->execute($sql, $params);
            
            // Create order items
            foreach ($orderItems as $item) {
                $this->createOrderItem($orderData['id'], $item);
            }
            
            $this->db->commit();
            
            return $orderData['id'];
            
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }
    
    private function createOrderItem($orderId, $item) {
        $sql = "INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, total_price) 
                VALUES (?, ?, ?, ?, ?, ?)";
        
        $params = [
            $orderId,
            $item['product_id'],
            $item['product_name'],
            $item['product_price'],
            $item['quantity'],
            $item['total_price']
        ];
        
        return $this->execute($sql, $params);
    }
    
    private function generateOrderId() {
        $prefix = 'ORD';
        $timestamp = date('ymd');
        $random = strtoupper(substr(uniqid(), -4));
        
        return $prefix . $timestamp . $random;
    }
    
    public function getOrderWithItems($orderId) {
        // Get order
        $order = $this->getById($orderId);
        if (!$order) {
            return null;
        }
        
        // Get order items
        $sql = "SELECT oi.*, p.image, p.slug 
                FROM order_items oi 
                LEFT JOIN products p ON oi.product_id = p.id 
                WHERE oi.order_id = ? 
                ORDER BY oi.id";
        
        $order['items'] = $this->fetchAll($sql, [$orderId]);
        
        return $order;
    }
    
    public function getOrders($filters = []) {
        $sql = "SELECT o.*, u.name as user_name 
                FROM orders o 
                LEFT JOIN users u ON o.user_id = u.id 
                WHERE 1=1";
        $params = [];
        
        // Filter by user
        if (!empty($filters['user_id'])) {
            $sql .= " AND o.user_id = ?";
            $params[] = $filters['user_id'];
        }
        
        // Filter by status
        if (!empty($filters['status'])) {
            $sql .= " AND o.status = ?";
            $params[] = $filters['status'];
        }
        
        // Filter by payment status
        if (!empty($filters['payment_status'])) {
            $sql .= " AND o.payment_status = ?";
            $params[] = $filters['payment_status'];
        }
        
        // Filter by date range
        if (!empty($filters['date_from'])) {
            $sql .= " AND DATE(o.created_at) >= ?";
            $params[] = $filters['date_from'];
        }
        
        if (!empty($filters['date_to'])) {
            $sql .= " AND DATE(o.created_at) <= ?";
            $params[] = $filters['date_to'];
        }
        
        // Search by order ID or customer
        if (!empty($filters['search'])) {
            $sql .= " AND (o.id LIKE ? OR o.customer_name LIKE ? OR o.customer_email LIKE ?)";
            $search = '%' . $filters['search'] . '%';
            $params[] = $search;
            $params[] = $search;
            $params[] = $search;
        }
        
        // Order by
        $orderBy = $filters['order_by'] ?? 'created_at';
        $orderDir = $filters['order_dir'] ?? 'DESC';
        $sql .= " ORDER BY o.{$orderBy} {$orderDir}";
        
        // Pagination
        if (!empty($filters['limit'])) {
            $sql .= " LIMIT " . (int)$filters['limit'];
            if (!empty($filters['offset'])) {
                $sql .= " OFFSET " . (int)$filters['offset'];
            }
        }
        
        return $this->fetchAll($sql, $params);
    }
    
    public function getUserOrders($userId, $limit = null) {
        $sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT " . (int)$limit;
        }
        
        return $this->fetchAll($sql, [$userId]);
    }
    
    public function updateOrderStatus($orderId, $status, $paymentStatus = null) {
        $data = ['status' => $status];
        
        if ($paymentStatus) {
            $data['payment_status'] = $paymentStatus;
        }
        
        return $this->update($orderId, $data);
    }
    
    public function getOrderStats() {
        $sql = "SELECT 
                    COUNT(*) as total_orders,
                    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
                    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
                    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders,
                    COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid_orders,
                    SUM(CASE WHEN payment_status = 'paid' THEN total_amount ELSE 0 END) as total_revenue,
                    AVG(CASE WHEN payment_status = 'paid' THEN total_amount ELSE NULL END) as average_order_value
                FROM orders";
        
        return $this->fetchOne($sql);
    }
    
    public function getUserOrderStats($userId) {
        $sql = "SELECT 
                    COUNT(*) as total_orders,
                    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
                    SUM(CASE WHEN payment_status = 'paid' THEN total_amount ELSE 0 END) as total_spent,
                    MAX(created_at) as last_order_date
                FROM orders 
                WHERE user_id = ?";
        
        return $this->fetchOne($sql, [$userId]);
    }
    
    public function getRevenueByPeriod($period = 'month', $limit = 12) {
        $dateFormat = $period === 'month' ? '%Y-%m' : '%Y-%m-%d';
        
        $sql = "SELECT 
                    DATE_FORMAT(created_at, '{$dateFormat}') as period,
                    COUNT(*) as orders_count,
                    SUM(CASE WHEN payment_status = 'paid' THEN total_amount ELSE 0 END) as revenue
                FROM orders 
                WHERE created_at >= DATE_SUB(NOW(), INTERVAL {$limit} " . strtoupper($period) . ")
                GROUP BY period 
                ORDER BY period DESC";
        
        return $this->fetchAll($sql);
    }
    
    public function getTopSellingProducts($limit = 10) {
        $sql = "SELECT 
                    oi.product_id,
                    oi.product_name,
                    p.image,
                    p.slug,
                    SUM(oi.quantity) as total_quantity,
                    COUNT(DISTINCT oi.order_id) as order_count,
                    SUM(oi.total_price) as total_revenue
                FROM order_items oi
                INNER JOIN orders o ON oi.order_id = o.id
                LEFT JOIN products p ON oi.product_id = p.id
                WHERE o.payment_status = 'paid'
                GROUP BY oi.product_id, oi.product_name
                ORDER BY total_quantity DESC
                LIMIT ?";
        
        return $this->fetchAll($sql, [$limit]);
    }
}
