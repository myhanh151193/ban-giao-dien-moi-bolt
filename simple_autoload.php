<?php
// File: simple_autoload.php
// Autoload đơn giản không cần Composer

// Hàm autoload tự động
spl_autoload_register(function($className) {
    
    // Danh sách thư mục chứa classes
    $directories = [
        __DIR__ . '/controllers/',
        __DIR__ . '/models/',
        __DIR__ . '/core/',
        __DIR__ . '/config/'
    ];
    
    // Tìm file class trong các thư mục
    foreach ($directories as $directory) {
        $file = $directory . $className . '.php';
        
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
    
    // Nếu không tìm thấy, báo lỗi
    throw new Exception("Class {$className} not found");
});

// Load các file config và helper functions
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/core/helpers.php';

echo "Simple autoload loaded successfully!\n";

/*
CÁCH SỬ DỤNG:

1. Thay vì: require_once __DIR__ . '/vendor/autoload.php';
   Dùng:    require_once __DIR__ . '/simple_autoload.php';

2. Cấu trúc thư mục:
   api/
   ├── controllers/
   │   ├── ProductController.php
   │   └── UserController.php
   ├── models/
   │   ├── Product.php
   │   └── User.php
   ├── config/
   │   └── database.php
   └── simple_autoload.php

3. Trong file index.php:
   <?php
   require_once 'simple_autoload.php';
   
   // Có thể dùng ngay:
   $controller = new ProductController();
   $model = new Product();
*/
?>
