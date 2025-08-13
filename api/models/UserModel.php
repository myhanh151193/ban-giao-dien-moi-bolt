<?php

require_once __DIR__ . '/../core/Model.php';

class UserModel extends Model {
    protected $table = 'users';
    
    public function createUser($data) {
        // Hash password
        if (isset($data['password'])) {
            $data['password_hash'] = password_hash($data['password'], PASSWORD_DEFAULT);
            unset($data['password']);
        }
        
        return $this->create($data);
    }
    
    public function updateUser($id, $data) {
        // Hash password if provided
        if (isset($data['password'])) {
            $data['password_hash'] = password_hash($data['password'], PASSWORD_DEFAULT);
            unset($data['password']);
        }
        
        return $this->update($id, $data);
    }
    
    public function getUserByEmail($email) {
        $sql = "SELECT * FROM users WHERE email = ?";
        return $this->fetchOne($sql, [$email]);
    }
    
    public function verifyPassword($email, $password) {
        $user = $this->getUserByEmail($email);
        
        if ($user && password_verify($password, $user['password_hash'])) {
            return $user;
        }
        
        return false;
    }
    
    public function updateLastLogin($userId) {
        $sql = "UPDATE users SET last_login = NOW() WHERE id = ?";
        return $this->execute($sql, [$userId]);
    }
    
    public function getUserStats() {
        $sql = "SELECT 
                    COUNT(*) as total_users,
                    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
                    COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
                    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_users_30_days
                FROM users";
        return $this->fetchOne($sql);
    }
    
    public function getCustomers($filters = []) {
        $sql = "SELECT id, name, email, phone, status, created_at, last_login,
                       (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as total_orders,
                       (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE user_id = users.id) as total_spent
                FROM users 
                WHERE role = 'customer'";
        $params = [];
        
        // Filter by status
        if (!empty($filters['status'])) {
            $sql .= " AND status = ?";
            $params[] = $filters['status'];
        }
        
        // Search by name or email
        if (!empty($filters['search'])) {
            $sql .= " AND (name LIKE ? OR email LIKE ?)";
            $params[] = '%' . $filters['search'] . '%';
            $params[] = '%' . $filters['search'] . '%';
        }
        
        // Order by
        $orderBy = $filters['order_by'] ?? 'created_at';
        $orderDir = $filters['order_dir'] ?? 'DESC';
        $sql .= " ORDER BY {$orderBy} {$orderDir}";
        
        // Pagination
        if (!empty($filters['limit'])) {
            $sql .= " LIMIT " . (int)$filters['limit'];
            if (!empty($filters['offset'])) {
                $sql .= " OFFSET " . (int)$filters['offset'];
            }
        }
        
        return $this->fetchAll($sql, $params);
    }
    
    public function createSession($userId, $sessionId) {
        $sql = "INSERT INTO user_sessions (id, user_id, ip_address, user_agent) VALUES (?, ?, ?, ?)";
        $params = [
            $sessionId,
            $userId,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        ];
        
        return $this->execute($sql, $params);
    }
    
    public function getSession($sessionId) {
        $sql = "SELECT s.*, u.id as user_id, u.name, u.email, u.role, u.status 
                FROM user_sessions s 
                INNER JOIN users u ON s.user_id = u.id 
                WHERE s.id = ? AND u.status = 'active'";
        return $this->fetchOne($sql, [$sessionId]);
    }
    
    public function updateSessionActivity($sessionId) {
        $sql = "UPDATE user_sessions SET last_activity = NOW() WHERE id = ?";
        return $this->execute($sql, [$sessionId]);
    }
    
    public function deleteSession($sessionId) {
        $sql = "DELETE FROM user_sessions WHERE id = ?";
        return $this->execute($sql, [$sessionId]);
    }
    
    public function deleteUserSessions($userId) {
        $sql = "DELETE FROM user_sessions WHERE user_id = ?";
        return $this->execute($sql, [$userId]);
    }
    
    public function cleanupExpiredSessions($hours = 24) {
        $sql = "DELETE FROM user_sessions WHERE last_activity < DATE_SUB(NOW(), INTERVAL ? HOUR)";
        return $this->execute($sql, [$hours]);
    }
    
    public function getUserByToken($token) {
        // This is a simple token validation
        // In production, use JWT or similar
        return $this->getSession($token);
    }
    
    public function generateSessionId() {
        return bin2hex(random_bytes(32));
    }
}
