<?php
// Ví dụ xử lý authentication token trong PHP

class AuthHandler {
    
    public function checkToken() {
        // Lấy token từ Authorization header
        $headers = getallheaders();
        $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
        
        if (empty($authHeader)) {
            return $this->returnError('Token không được cung cấp', 401);
        }
        
        // Lấy token từ "Bearer {token}"
        if (strpos($authHeader, 'Bearer ') === 0) {
            $token = substr($authHeader, 7); // Bỏ "Bearer "
        } else {
            return $this->returnError('Format token không đúng', 401);
        }
        
        // Kiểm tra token có hợp lệ không
        if (empty($token) || $token === 'fake-jwt-token') {
            return $this->returnError('Token không hợp lệ', 401);
        }
        
        // Xác thực token (ví dụ với JWT hoặc database)
        $user = $this->validateToken($token);
        
        if (!$user) {
            return $this->returnError('Token đã hết hạn hoặc không hợp lệ', 401);
        }
        
        return $user;
    }
    
    private function validateToken($token) {
        // Ph��ơng pháp 1: Kiểm tra với database
        // $stmt = $pdo->prepare("SELECT * FROM users WHERE token = ? AND token_expires > NOW()");
        // $stmt->execute([$token]);
        // return $stmt->fetch();
        
        // Phương pháp 2: Xác thực JWT token
        try {
            // Sử dụng thư viện JWT
            // $decoded = JWT::decode($token, $secret_key, ['HS256']);
            // return $decoded->data; // user data trong JWT
            
            // Ví dụ đơn giản: kiểm tra token cố định
            if ($token === 'valid_admin_token_123') {
                return [
                    'id' => 1,
                    'username' => 'admin',
                    'role' => 'admin',
                    'email' => 'admin@templatehub.com'
                ];
            }
            
            return false;
            
        } catch (Exception $e) {
            return false;
        }
    }
    
    private function returnError($message, $code = 400) {
        http_response_code($code);
        return [
            'success' => false,
            'message' => $message,
            'code' => $code
        ];
    }
    
    public function requireAuth() {
        $user = $this->checkToken();
        
        if (isset($user['success']) && $user['success'] === false) {
            // Token không hợp lệ, trả về lỗi
            header('Content-Type: application/json');
            echo json_encode($user);
            exit;
        }
        
        return $user;
    }
}

// Ví dụ sử dụng trong controller
class ProductController {
    
    public function getProducts() {
        $auth = new AuthHandler();
        
        // Kiểm tra authentication cho các endpoint cần bảo mật
        // $user = $auth->requireAuth();
        
        // Hoặc chỉ kiểm tra mà không bắt buộc
        $user = $auth->checkToken();
        $isAuthenticated = !isset($user['success']) || $user['success'] !== false;
        
        if ($isAuthenticated) {
            // User đã đăng nhập - trả về dữ liệu đầy đủ
            return $this->getFullProductData();
        } else {
            // User chưa đăng nhập - trả về dữ liệu public
            return $this->getPublicProductData();
        }
    }
    
    private function getFullProductData() {
        // Dữ liệu đầy đủ cho user đã đăng nhập
        return [
            'success' => true,
            'data' => [
                [
                    'id' => 1,
                    'name' => 'E-commerce Pro Template',
                    'price' => 2390000,
                    'download_link' => 'https://example.com/download/secure/123',
                    // ... dữ liệu đầy đủ
                ]
            ]
        ];
    }
    
    private function getPublicProductData() {
        // Dữ liệu giới hạn cho guest user
        return [
            'success' => true,
            'data' => [
                [
                    'id' => 1,
                    'name' => 'E-commerce Pro Template',
                    'price' => 2390000,
                    'preview_only' => true,
                    // Không có download_link
                ]
            ]
        ];
    }
}

// Ví dụ sử dụng trong API endpoint
header('Content-Type: application/json');

try {
    $controller = new ProductController();
    $result = $controller->getProducts();
    echo json_encode($result);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi server: ' . $e->getMessage()
    ]);
}
?>
