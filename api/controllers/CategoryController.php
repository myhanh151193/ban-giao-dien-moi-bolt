<?php

require_once __DIR__ . '/../core/Controller.php';
require_once __DIR__ . '/../models/CategoryModel.php';

class CategoryController extends Controller {
    private $categoryModel;
    
    public function __construct() {
        $this->categoryModel = new CategoryModel();
    }
    
    public function index($params = []) {
        try {
            $withCount = isset($_GET['with_count']) && $_GET['with_count'] === 'true';
            
            if ($withCount) {
                $categories = $this->categoryModel->getCategoriesWithCount();
            } else {
                $categories = $this->categoryModel->getActiveCategories();
            }
            
            $this->successResponse($categories);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch categories: ' . $e->getMessage(), 500);
        }
    }
    
    public function show($params) {
        try {
            $id = $params['id'];
            
            // Check if it's a slug or ID
            if (is_numeric($id)) {
                $category = $this->categoryModel->getById($id);
            } else {
                $category = $this->categoryModel->getCategoryBySlug($id);
            }
            
            if (!$category) {
                $this->errorResponse('Category not found', 404);
            }
            
            $this->successResponse($category);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch category: ' . $e->getMessage(), 500);
        }
    }
    
    public function store($params = []) {
        try {
            $this->requireAdmin();
            
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['name'];
            $this->validateRequired($data, $required);
            
            // Check if category name already exists
            if ($this->categoryModel->exists('name', $data['name'])) {
                $this->errorResponse('Category name already exists', 422);
            }
            
            $categoryId = $this->categoryModel->createCategory($data);
            
            $category = $this->categoryModel->getById($categoryId);
            
            $this->successResponse($category, 'Category created successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to create category: ' . $e->getMessage(), 500);
        }
    }
    
    public function update($params) {
        try {
            $this->requireAdmin();
            
            $id = $params['id'];
            $data = $this->getJsonInput();
            
            // Check if category exists
            $category = $this->categoryModel->getById($id);
            if (!$category) {
                $this->errorResponse('Category not found', 404);
            }
            
            // Check if category name already exists (excluding current category)
            if (isset($data['name']) && $this->categoryModel->exists('name', $data['name'], $id)) {
                $this->errorResponse('Category name already exists', 422);
            }
            
            $updated = $this->categoryModel->updateCategory($id, $data);
            
            if ($updated) {
                $category = $this->categoryModel->getById($id);
                $this->successResponse($category, 'Category updated successfully');
            } else {
                $this->errorResponse('No changes made', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to update category: ' . $e->getMessage(), 500);
        }
    }
    
    public function delete($params) {
        try {
            $this->requireAdmin();
            
            $id = $params['id'];
            
            // Check if category exists
            $category = $this->categoryModel->getById($id);
            if (!$category) {
                $this->errorResponse('Category not found', 404);
            }
            
            // Check if category has products
            $productModel = new ProductModel();
            $productCount = $productModel->count('category_id = ?', [$id]);
            
            if ($productCount > 0) {
                $this->errorResponse('Cannot delete category with existing products', 422);
            }
            
            $deleted = $this->categoryModel->delete($id);
            
            if ($deleted) {
                $this->successResponse(null, 'Category deleted successfully');
            } else {
                $this->errorResponse('Failed to delete category', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to delete category: ' . $e->getMessage(), 500);
        }
    }
}
