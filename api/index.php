<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include autoloader and dependencies
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/core/Controller.php';
require_once __DIR__ . '/core/Model.php';

// Include controllers
require_once __DIR__ . '/controllers/ProductController.php';
require_once __DIR__ . '/controllers/UserController.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/CartController.php';
require_once __DIR__ . '/controllers/OrderController.php';
require_once __DIR__ . '/controllers/BlogController.php';
require_once __DIR__ . '/controllers/CategoryController.php';

try {
    // Initialize router
    $router = new Router();
    
    // Product routes
    $router->get('/api/products', 'ProductController@index');
    $router->get('/api/products/{id}', 'ProductController@show');
    $router->post('/api/products', 'ProductController@store');
    $router->put('/api/products/{id}', 'ProductController@update');
    $router->delete('/api/products/{id}', 'ProductController@delete');
    $router->get('/api/products/category/{category}', 'ProductController@getByCategory');
    $router->get('/api/products/search/{query}', 'ProductController@search');
    
    // Category routes
    $router->get('/api/categories', 'CategoryController@index');
    $router->get('/api/categories/{id}', 'CategoryController@show');
    $router->post('/api/categories', 'CategoryController@store');
    $router->put('/api/categories/{id}', 'CategoryController@update');
    $router->delete('/api/categories/{id}', 'CategoryController@delete');
    
    // Auth routes
    $router->post('/api/auth/login', 'AuthController@login');
    $router->post('/api/auth/register', 'AuthController@register');
    $router->post('/api/auth/logout', 'AuthController@logout');
    $router->get('/api/auth/me', 'AuthController@me');
    $router->post('/api/auth/refresh', 'AuthController@refresh');
    
    // User routes
    $router->get('/api/users', 'UserController@index');
    $router->get('/api/users/{id}', 'UserController@show');
    $router->put('/api/users/{id}', 'UserController@update');
    $router->delete('/api/users/{id}', 'UserController@delete');
    
    // Cart routes
    $router->get('/api/cart', 'CartController@index');
    $router->post('/api/cart/add', 'CartController@addItem');
    $router->put('/api/cart/update/{id}', 'CartController@updateItem');
    $router->delete('/api/cart/remove/{id}', 'CartController@removeItem');
    $router->delete('/api/cart/clear', 'CartController@clearCart');
    
    // Order routes
    $router->get('/api/orders', 'OrderController@index');
    $router->get('/api/orders/{id}', 'OrderController@show');
    $router->post('/api/orders', 'OrderController@store');
    $router->put('/api/orders/{id}', 'OrderController@update');
    $router->delete('/api/orders/{id}', 'OrderController@delete');
    $router->get('/api/orders/user/{userId}', 'OrderController@getUserOrders');
    
    // Blog routes
    $router->get('/api/blog', 'BlogController@index');
    $router->get('/api/blog/{slug}', 'BlogController@show');
    $router->post('/api/blog', 'BlogController@store');
    $router->put('/api/blog/{id}', 'BlogController@update');
    $router->delete('/api/blog/{id}', 'BlogController@delete');
    $router->get('/api/blog/category/{category}', 'BlogController@getByCategory');
    
    // Handle the request
    $router->handle();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal Server Error',
        'error' => $e->getMessage()
    ]);
}
