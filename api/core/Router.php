<?php

class Router {
    private $routes = [];
    
    public function get($path, $handler) {
        $this->addRoute('GET', $path, $handler);
    }
    
    public function post($path, $handler) {
        $this->addRoute('POST', $path, $handler);
    }
    
    public function put($path, $handler) {
        $this->addRoute('PUT', $path, $handler);
    }
    
    public function delete($path, $handler) {
        $this->addRoute('DELETE', $path, $handler);
    }
    
    private function addRoute($method, $path, $handler) {
        $pattern = preg_replace('/\{([^}]+)\}/', '(?P<$1>[^/]+)', $path);
        $pattern = '#^' . $pattern . '$#';
        
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler,
            'path' => $path
        ];
    }
    
    public function handle() {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        foreach ($this->routes as $route) {
            if ($route['method'] === $method && preg_match($route['pattern'], $uri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return $this->callHandler($route['handler'], $params);
            }
        }
        
        // Route not found
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Route not found'
        ]);
    }
    
    private function callHandler($handler, $params = []) {
        list($controller, $method) = explode('@', $handler);
        
        if (!class_exists($controller)) {
            throw new Exception("Controller {$controller} not found");
        }
        
        $instance = new $controller();
        
        if (!method_exists($instance, $method)) {
            throw new Exception("Method {$method} not found in {$controller}");
        }
        
        return $instance->$method($params);
    }
}
