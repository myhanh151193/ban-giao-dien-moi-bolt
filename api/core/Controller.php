<?php

class Controller {
    protected function jsonResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    protected function successResponse($data = null, $message = 'Success') {
        $response = [
            'success' => true,
            'message' => $message
        ];
        
        if ($data !== null) {
            $response['data'] = $data;
        }
        
        $this->jsonResponse($response);
    }
    
    protected function errorResponse($message = 'Error', $statusCode = 400, $errors = null) {
        $response = [
            'success' => false,
            'message' => $message
        ];
        
        if ($errors !== null) {
            $response['errors'] = $errors;
        }
        
        $this->jsonResponse($response, $statusCode);
    }
    
    protected function getJsonInput() {
        $input = file_get_contents('php://input');
        return json_decode($input, true) ?: [];
    }
    
    protected function validateRequired($data, $required) {
        $missing = [];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                $missing[] = $field;
            }
        }
        
        if (!empty($missing)) {
            $this->errorResponse(
                'Missing required fields', 
                422, 
                ['missing_fields' => $missing]
            );
        }
    }
    
    protected function getCurrentUser() {
        $headers = getallheaders();
        $token = null;
        
        if (isset($headers['Authorization'])) {
            $token = str_replace('Bearer ', '', $headers['Authorization']);
        }
        
        if (!$token) {
            return null;
        }
        
        // Simple token validation - in production use JWT
        $userModel = new UserModel();
        return $userModel->getUserByToken($token);
    }
    
    protected function requireAuth() {
        $user = $this->getCurrentUser();
        if (!$user) {
            $this->errorResponse('Unauthorized', 401);
        }
        return $user;
    }
    
    protected function requireAdmin() {
        $user = $this->requireAuth();
        if ($user['role'] !== 'admin') {
            $this->errorResponse('Admin access required', 403);
        }
        return $user;
    }
    
    protected function getPaginationParams() {
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
        $offset = ($page - 1) * $limit;
        
        return [
            'page' => $page,
            'limit' => $limit,
            'offset' => $offset
        ];
    }
}
