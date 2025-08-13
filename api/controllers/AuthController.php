<?php

require_once __DIR__ . '/../core/Controller.php';
require_once __DIR__ . '/../models/UserModel.php';

class AuthController extends Controller {
    private $userModel;
    
    public function __construct() {
        $this->userModel = new UserModel();
    }
    
    public function register($params = []) {
        try {
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['name', 'email', 'password'];
            $this->validateRequired($data, $required);
            
            // Validate email format
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                $this->errorResponse('Invalid email format', 422);
            }
            
            // Check if email already exists
            if ($this->userModel->getUserByEmail($data['email'])) {
                $this->errorResponse('Email already registered', 422);
            }
            
            // Validate password strength
            if (strlen($data['password']) < 6) {
                $this->errorResponse('Password must be at least 6 characters', 422);
            }
            
            // Create user
            $userData = [
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'phone' => $data['phone'] ?? null,
                'role' => 'customer',
                'status' => 'active'
            ];
            
            $userId = $this->userModel->createUser($userData);
            $user = $this->userModel->getById($userId);
            
            // Remove sensitive data
            unset($user['password_hash']);
            
            // Create session
            $sessionId = $this->userModel->generateSessionId();
            $this->userModel->createSession($userId, $sessionId);
            
            $response = [
                'user' => $user,
                'token' => $sessionId
            ];
            
            $this->successResponse($response, 'Registration successful');
            
        } catch (Exception $e) {
            $this->errorResponse('Registration failed: ' . $e->getMessage(), 500);
        }
    }
    
    public function login($params = []) {
        try {
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['email', 'password'];
            $this->validateRequired($data, $required);
            
            // Verify credentials
            $user = $this->userModel->verifyPassword($data['email'], $data['password']);
            
            if (!$user) {
                $this->errorResponse('Invalid email or password', 401);
            }
            
            // Check if user is active
            if ($user['status'] !== 'active') {
                $this->errorResponse('Account is suspended', 403);
            }
            
            // Update last login
            $this->userModel->updateLastLogin($user['id']);
            
            // Create session
            $sessionId = $this->userModel->generateSessionId();
            $this->userModel->createSession($user['id'], $sessionId);
            
            // Remove sensitive data
            unset($user['password_hash']);
            
            $response = [
                'user' => $user,
                'token' => $sessionId
            ];
            
            $this->successResponse($response, 'Login successful');
            
        } catch (Exception $e) {
            $this->errorResponse('Login failed: ' . $e->getMessage(), 500);
        }
    }
    
    public function logout($params = []) {
        try {
            $user = $this->requireAuth();
            
            // Get session token
            $headers = getallheaders();
            $token = null;
            
            if (isset($headers['Authorization'])) {
                $token = str_replace('Bearer ', '', $headers['Authorization']);
            }
            
            if ($token) {
                $this->userModel->deleteSession($token);
            }
            
            $this->successResponse(null, 'Logout successful');
            
        } catch (Exception $e) {
            $this->errorResponse('Logout failed: ' . $e->getMessage(), 500);
        }
    }
    
    public function me($params = []) {
        try {
            $user = $this->requireAuth();
            
            // Remove sensitive data
            unset($user['password_hash']);
            
            $this->successResponse($user);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to get user info: ' . $e->getMessage(), 500);
        }
    }
    
    public function refresh($params = []) {
        try {
            $user = $this->requireAuth();
            
            // Get current session token
            $headers = getallheaders();
            $oldToken = null;
            
            if (isset($headers['Authorization'])) {
                $oldToken = str_replace('Bearer ', '', $headers['Authorization']);
            }
            
            // Generate new session
            $newSessionId = $this->userModel->generateSessionId();
            $this->userModel->createSession($user['user_id'], $newSessionId);
            
            // Delete old session
            if ($oldToken) {
                $this->userModel->deleteSession($oldToken);
            }
            
            // Get updated user info
            $userData = $this->userModel->getById($user['user_id']);
            unset($userData['password_hash']);
            
            $response = [
                'user' => $userData,
                'token' => $newSessionId
            ];
            
            $this->successResponse($response, 'Token refreshed successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Token refresh failed: ' . $e->getMessage(), 500);
        }
    }
    
    public function changePassword($params = []) {
        try {
            $user = $this->requireAuth();
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['current_password', 'new_password'];
            $this->validateRequired($data, $required);
            
            // Verify current password
            $userData = $this->userModel->getById($user['user_id']);
            if (!password_verify($data['current_password'], $userData['password_hash'])) {
                $this->errorResponse('Current password is incorrect', 422);
            }
            
            // Validate new password
            if (strlen($data['new_password']) < 6) {
                $this->errorResponse('New password must be at least 6 characters', 422);
            }
            
            // Update password
            $this->userModel->updateUser($user['user_id'], [
                'password' => $data['new_password']
            ]);
            
            // Logout all sessions except current
            $this->userModel->deleteUserSessions($user['user_id']);
            
            // Create new session
            $newSessionId = $this->userModel->generateSessionId();
            $this->userModel->createSession($user['user_id'], $newSessionId);
            
            $response = [
                'token' => $newSessionId
            ];
            
            $this->successResponse($response, 'Password changed successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Password change failed: ' . $e->getMessage(), 500);
        }
    }
}
