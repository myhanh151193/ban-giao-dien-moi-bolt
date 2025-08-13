<?php

require_once __DIR__ . '/../core/Controller.php';
require_once __DIR__ . '/../models/UserModel.php';

class UserController extends Controller {
    private $userModel;
    
    public function __construct() {
        $this->userModel = new UserModel();
    }
    
    public function index($params = []) {
        try {
            $this->requireAdmin();
            
            $filters = [
                'status' => $_GET['status'] ?? null,
                'search' => $_GET['search'] ?? null,
                'order_by' => $_GET['order_by'] ?? 'created_at',
                'order_dir' => $_GET['order_dir'] ?? 'DESC'
            ];
            
            $pagination = $this->getPaginationParams();
            $filters['limit'] = $pagination['limit'];
            $filters['offset'] = $pagination['offset'];
            
            $users = $this->userModel->getCustomers($filters);
            
            // Get total count for pagination
            $total = $this->userModel->count("role = 'customer'");
            
            // Remove sensitive data
            foreach ($users as &$user) {
                unset($user['password_hash']);
            }
            
            $response = [
                'users' => $users,
                'pagination' => [
                    'current_page' => $pagination['page'],
                    'per_page' => $pagination['limit'],
                    'total' => $total,
                    'total_pages' => ceil($total / $pagination['limit'])
                ]
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch users: ' . $e->getMessage(), 500);
        }
    }
    
    public function show($params) {
        try {
            $currentUser = $this->requireAuth();
            $id = $params['id'];
            
            // Users can only view their own profile, admins can view any
            if ($currentUser['role'] !== 'admin' && $currentUser['user_id'] != $id) {
                $this->errorResponse('Access denied', 403);
            }
            
            $user = $this->userModel->getById($id);
            
            if (!$user) {
                $this->errorResponse('User not found', 404);
            }
            
            // Remove sensitive data
            unset($user['password_hash']);
            
            // If admin viewing customer, add order statistics
            if ($currentUser['role'] === 'admin' && $user['role'] === 'customer') {
                $orderModel = new OrderModel();
                $user['order_stats'] = $orderModel->getUserOrderStats($id);
            }
            
            $this->successResponse($user);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch user: ' . $e->getMessage(), 500);
        }
    }
    
    public function update($params) {
        try {
            $currentUser = $this->requireAuth();
            $id = $params['id'];
            $data = $this->getJsonInput();
            
            // Users can only update their own profile, admins can update any
            if ($currentUser['role'] !== 'admin' && $currentUser['user_id'] != $id) {
                $this->errorResponse('Access denied', 403);
            }
            
            // Check if user exists
            $user = $this->userModel->getById($id);
            if (!$user) {
                $this->errorResponse('User not found', 404);
            }
            
            // Validate email if provided
            if (isset($data['email'])) {
                if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                    $this->errorResponse('Invalid email format', 422);
                }
                
                // Check if email already exists (excluding current user)
                if ($this->userModel->exists('email', $data['email'], $id)) {
                    $this->errorResponse('Email already exists', 422);
                }
            }
            
            // Non-admins cannot change role or status
            if ($currentUser['role'] !== 'admin') {
                unset($data['role'], $data['status']);
            }
            
            // Validate password if provided
            if (isset($data['password'])) {
                if (strlen($data['password']) < 6) {
                    $this->errorResponse('Password must be at least 6 characters', 422);
                }
            }
            
            $updated = $this->userModel->updateUser($id, $data);
            
            if ($updated) {
                $user = $this->userModel->getById($id);
                unset($user['password_hash']);
                
                $this->successResponse($user, 'User updated successfully');
            } else {
                $this->errorResponse('No changes made', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to update user: ' . $e->getMessage(), 500);
        }
    }
    
    public function delete($params) {
        try {
            $this->requireAdmin();
            
            $id = $params['id'];
            
            // Check if user exists
            $user = $this->userModel->getById($id);
            if (!$user) {
                $this->errorResponse('User not found', 404);
            }
            
            // Prevent deleting admin users
            if ($user['role'] === 'admin') {
                $this->errorResponse('Cannot delete admin users', 422);
            }
            
            // Check if user has orders
            $orderModel = new OrderModel();
            $orderCount = $orderModel->count('user_id = ?', [$id]);
            
            if ($orderCount > 0) {
                // Soft delete by deactivating instead of hard delete
                $this->userModel->update($id, ['status' => 'inactive']);
                $this->successResponse(null, 'User deactivated successfully');
            } else {
                // Hard delete if no orders
                $this->userModel->delete($id);
                $this->successResponse(null, 'User deleted successfully');
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to delete user: ' . $e->getMessage(), 500);
        }
    }
    
    public function getProfile($params = []) {
        try {
            $user = $this->requireAuth();
            
            $userData = $this->userModel->getById($user['user_id']);
            unset($userData['password_hash']);
            
            // Add order statistics for customers
            if ($userData['role'] === 'customer') {
                $orderModel = new OrderModel();
                $userData['order_stats'] = $orderModel->getUserOrderStats($user['user_id']);
            }
            
            $this->successResponse($userData);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to get profile: ' . $e->getMessage(), 500);
        }
    }
    
    public function updateProfile($params = []) {
        try {
            $user = $this->requireAuth();
            $data = $this->getJsonInput();
            
            // Remove fields that shouldn't be updated via profile
            unset($data['role'], $data['status'], $data['password']);
            
            // Validate email if provided
            if (isset($data['email'])) {
                if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                    $this->errorResponse('Invalid email format', 422);
                }
                
                if ($this->userModel->exists('email', $data['email'], $user['user_id'])) {
                    $this->errorResponse('Email already exists', 422);
                }
            }
            
            $updated = $this->userModel->update($user['user_id'], $data);
            
            if ($updated) {
                $userData = $this->userModel->getById($user['user_id']);
                unset($userData['password_hash']);
                
                $this->successResponse($userData, 'Profile updated successfully');
            } else {
                $this->errorResponse('No changes made', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to update profile: ' . $e->getMessage(), 500);
        }
    }
}
