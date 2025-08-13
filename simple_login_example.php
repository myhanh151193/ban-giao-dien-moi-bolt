<?php
// Ví dụ login đơn giản không cần token cho PHP backend

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Lấy dữ liệu từ request body
    $input = json_decode(file_get_contents('php://input'), true);
    
    $username = isset($input['username']) ? trim($input['username']) : '';
    $password = isset($input['password']) ? trim($input['password']) : '';
    
    // Kiểm tra đầu vào
    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Username và password không được để trống'
        ]);
        exit;
    }
    
    // Kiểm tra thông tin đăng nhập đơn giản
    if ($username === 'admin' && $password === 'Admin@@2025') {
        
        // Đăng nhập thành công
        echo json_encode([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'user' => [
                'username' => 'admin',
                'role' => 'admin',
                'name' => 'Administrator',
                'email' => 'admin@templatehub.com'
            ]
        ]);
        
    } else {
        
        // Đăng nhập thất bại
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Tên đăng nhập hoặc mật khẩu không đúng'
        ]);
    }
    
} else {
    
    // Method không được hỗ trợ
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method không được hỗ trợ'
    ]);
}

/*
CÁCH SỬ DỤNG:

1. Đặt file này vào: api/controllers/AuthController.php

2. Hoặc tạo routing trong index.php:
   if ($request_uri === '/auth/login' && $method === 'POST') {
       include 'controllers/AuthController.php';
   }

3. Frontend sẽ gọi:
   POST https://medisosoft.com/path/api/auth
   Body: {"username": "admin", "password": "Admin@@2025"}

4. Response success:
   {
     "success": true,
     "message": "Đăng nhập thành công",
     "user": {
       "username": "admin",
       "role": "admin",
       "name": "Administrator"
     }
   }

5. Response error:
   {
     "success": false,
     "message": "Tên đăng nhập hoặc mật khẩu không đúng"
   }

TÙNG CHỈNH MỞ RỘNG:

- Thêm nhiều user:
  $users = [
      'admin' => 'Admin@@2025',
      'user1' => 'password123'
  ];

- Kết nối database:
  $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
  $stmt->execute([$username, md5($password)]);
  $user = $stmt->fetch();

- Session management:
  session_start();
  $_SESSION['user_id'] = $user['id'];
  $_SESSION['username'] = $user['username'];
*/
?>
