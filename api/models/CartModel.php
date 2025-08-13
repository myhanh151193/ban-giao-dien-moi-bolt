<?php

require_once __DIR__ . '/../core/Model.php';

class CartModel extends Model {
    protected $table = 'cart_items';
    
    public function getCartItems($userId = null, $sessionId = null) {
        $sql = "SELECT ci.*, p.name, p.price, p.image, p.slug, p.in_stock 
                FROM cart_items ci 
                INNER JOIN products p ON ci.product_id = p.id 
                WHERE p.is_active = 1";
        $params = [];
        
        if ($userId) {
            $sql .= " AND ci.user_id = ?";
            $params[] = $userId;
        } elseif ($sessionId) {
            $sql .= " AND ci.session_id = ?";
            $params[] = $sessionId;
        } else {
            return [];
        }
        
        $sql .= " ORDER BY ci.created_at DESC";
        
        return $this->fetchAll($sql, $params);
    }
    
    public function addItem($productId, $quantity = 1, $userId = null, $sessionId = null) {
        // Check if item already exists
        $existingItem = $this->getCartItem($productId, $userId, $sessionId);
        
        if ($existingItem) {
            // Update quantity
            return $this->updateItemQuantity($existingItem['id'], $existingItem['quantity'] + $quantity);
        } else {
            // Add new item
            $data = [
                'product_id' => $productId,
                'quantity' => $quantity,
                'user_id' => $userId,
                'session_id' => $sessionId
            ];
            
            return $this->create($data);
        }
    }
    
    public function getCartItem($productId, $userId = null, $sessionId = null) {
        $sql = "SELECT * FROM cart_items WHERE product_id = ?";
        $params = [$productId];
        
        if ($userId) {
            $sql .= " AND user_id = ?";
            $params[] = $userId;
        } elseif ($sessionId) {
            $sql .= " AND session_id = ?";
            $params[] = $sessionId;
        } else {
            return null;
        }
        
        return $this->fetchOne($sql, $params);
    }
    
    public function updateItemQuantity($itemId, $quantity) {
        if ($quantity <= 0) {
            return $this->delete($itemId);
        }
        
        return $this->update($itemId, ['quantity' => $quantity]);
    }
    
    public function removeItem($itemId, $userId = null, $sessionId = null) {
        $sql = "DELETE FROM cart_items WHERE id = ?";
        $params = [$itemId];
        
        if ($userId) {
            $sql .= " AND user_id = ?";
            $params[] = $userId;
        } elseif ($sessionId) {
            $sql .= " AND session_id = ?";
            $params[] = $sessionId;
        }
        
        return $this->execute($sql, $params);
    }
    
    public function clearCart($userId = null, $sessionId = null) {
        $sql = "DELETE FROM cart_items WHERE ";
        $params = [];
        
        if ($userId) {
            $sql .= "user_id = ?";
            $params[] = $userId;
        } elseif ($sessionId) {
            $sql .= "session_id = ?";
            $params[] = $sessionId;
        } else {
            return false;
        }
        
        return $this->execute($sql, $params);
    }
    
    public function getCartSummary($userId = null, $sessionId = null) {
        $items = $this->getCartItems($userId, $sessionId);
        
        $summary = [
            'items' => $items,
            'total_items' => 0,
            'subtotal' => 0,
            'shipping_fee' => 0,
            'total' => 0
        ];
        
        foreach ($items as $item) {
            $summary['total_items'] += $item['quantity'];
            $summary['subtotal'] += $item['price'] * $item['quantity'];
        }
        
        // Calculate shipping fee
        $summary['shipping_fee'] = $this->calculateShippingFee($summary['subtotal']);
        $summary['total'] = $summary['subtotal'] + $summary['shipping_fee'];
        
        return $summary;
    }
    
    private function calculateShippingFee($subtotal) {
        // Get shipping settings
        $settingsModel = new SettingsModel();
        $shippingFee = $settingsModel->getSetting('shipping_fee', 50000);
        $freeShippingThreshold = $settingsModel->getSetting('free_shipping_threshold', 1000000);
        
        return $subtotal >= $freeShippingThreshold ? 0 : $shippingFee;
    }
    
    public function transferSessionCart($sessionId, $userId) {
        // Get session cart items
        $sessionItems = $this->getCartItems(null, $sessionId);
        
        foreach ($sessionItems as $item) {
            // Check if user already has this product in cart
            $existingItem = $this->getCartItem($item['product_id'], $userId);
            
            if ($existingItem) {
                // Update quantity
                $newQuantity = $existingItem['quantity'] + $item['quantity'];
                $this->updateItemQuantity($existingItem['id'], $newQuantity);
            } else {
                // Add item to user cart
                $this->addItem($item['product_id'], $item['quantity'], $userId);
            }
        }
        
        // Clear session cart
        $this->clearCart(null, $sessionId);
    }
    
    public function validateCartItems($userId = null, $sessionId = null) {
        $items = $this->getCartItems($userId, $sessionId);
        $issues = [];
        
        foreach ($items as $item) {
            if (!$item['in_stock']) {
                $issues[] = [
                    'item_id' => $item['id'],
                    'product_name' => $item['name'],
                    'issue' => 'out_of_stock'
                ];
            }
        }
        
        return $issues;
    }
}
