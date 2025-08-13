<?php

require_once __DIR__ . '/../core/Controller.php';
require_once __DIR__ . '/../models/ProductModel.php';

class ProductController extends Controller {
    private $productModel;
    
    public function __construct() {
        $this->productModel = new ProductModel();
    }
    
    public function index($params = []) {
        try {
            $filters = [
                'category' => $_GET['category'] ?? null,
                'search' => $_GET['search'] ?? null,
                'min_price' => $_GET['min_price'] ?? null,
                'max_price' => $_GET['max_price'] ?? null,
                'in_stock' => isset($_GET['in_stock']) ? (bool)$_GET['in_stock'] : null,
                'order_by' => $_GET['order_by'] ?? 'created_at',
                'order_dir' => $_GET['order_dir'] ?? 'DESC'
            ];
            
            $pagination = $this->getPaginationParams();
            $filters['limit'] = $pagination['limit'];
            $filters['offset'] = $pagination['offset'];
            
            $products = $this->productModel->getProducts($filters);
            
            // Get total count for pagination
            $totalFilters = $filters;
            unset($totalFilters['limit'], $totalFilters['offset']);
            $total = $this->productModel->count();
            
            // Parse JSON fields
            foreach ($products as &$product) {
                $product['features'] = json_decode($product['features'] ?? '[]', true);
                $product['seo_keywords'] = json_decode($product['seo_keywords'] ?? '[]', true);
            }
            
            $response = [
                'products' => $products,
                'pagination' => [
                    'current_page' => $pagination['page'],
                    'per_page' => $pagination['limit'],
                    'total' => $total,
                    'total_pages' => ceil($total / $pagination['limit'])
                ]
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch products: ' . $e->getMessage(), 500);
        }
    }
    
    public function show($params) {
        try {
            $id = $params['id'];
            
            // Check if it's a slug or ID
            if (is_numeric($id)) {
                $product = $this->productModel->getById($id);
            } else {
                $product = $this->productModel->getProductBySlug($id);
            }
            
            if (!$product) {
                $this->errorResponse('Product not found', 404);
            }
            
            // Parse JSON fields
            $product['features'] = json_decode($product['features'] ?? '[]', true);
            $product['seo_keywords'] = json_decode($product['seo_keywords'] ?? '[]', true);
            
            // Get related products
            $relatedProducts = $this->productModel->getRelatedProducts(
                $product['id'], 
                $product['category_id'], 
                4
            );
            
            foreach ($relatedProducts as &$related) {
                $related['features'] = json_decode($related['features'] ?? '[]', true);
            }
            
            $response = [
                'product' => $product,
                'related_products' => $relatedProducts
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch product: ' . $e->getMessage(), 500);
        }
    }
    
    public function store($params = []) {
        try {
            $this->requireAdmin();
            
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['name', 'description', 'price', 'image', 'category_id'];
            $this->validateRequired($data, $required);
            
            // Validate price
            if (!is_numeric($data['price']) || $data['price'] < 0) {
                $this->errorResponse('Invalid price', 422);
            }
            
            // Validate category exists
            $categoryModel = new CategoryModel();
            if (!$categoryModel->getById($data['category_id'])) {
                $this->errorResponse('Category not found', 422);
            }
            
            $productId = $this->productModel->createProduct($data);
            
            $product = $this->productModel->getById($productId);
            $product['features'] = json_decode($product['features'] ?? '[]', true);
            $product['seo_keywords'] = json_decode($product['seo_keywords'] ?? '[]', true);
            
            $this->successResponse($product, 'Product created successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to create product: ' . $e->getMessage(), 500);
        }
    }
    
    public function update($params) {
        try {
            $this->requireAdmin();
            
            $id = $params['id'];
            $data = $this->getJsonInput();
            
            // Check if product exists
            $product = $this->productModel->getById($id);
            if (!$product) {
                $this->errorResponse('Product not found', 404);
            }
            
            // Validate price if provided
            if (isset($data['price']) && (!is_numeric($data['price']) || $data['price'] < 0)) {
                $this->errorResponse('Invalid price', 422);
            }
            
            // Validate category if provided
            if (isset($data['category_id'])) {
                $categoryModel = new CategoryModel();
                if (!$categoryModel->getById($data['category_id'])) {
                    $this->errorResponse('Category not found', 422);
                }
            }
            
            $updated = $this->productModel->updateProduct($id, $data);
            
            if ($updated) {
                $product = $this->productModel->getById($id);
                $product['features'] = json_decode($product['features'] ?? '[]', true);
                $product['seo_keywords'] = json_decode($product['seo_keywords'] ?? '[]', true);
                
                $this->successResponse($product, 'Product updated successfully');
            } else {
                $this->errorResponse('No changes made', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to update product: ' . $e->getMessage(), 500);
        }
    }
    
    public function delete($params) {
        try {
            $this->requireAdmin();
            
            $id = $params['id'];
            
            // Check if product exists
            $product = $this->productModel->getById($id);
            if (!$product) {
                $this->errorResponse('Product not found', 404);
            }
            
            $deleted = $this->productModel->delete($id);
            
            if ($deleted) {
                $this->successResponse(null, 'Product deleted successfully');
            } else {
                $this->errorResponse('Failed to delete product', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to delete product: ' . $e->getMessage(), 500);
        }
    }
    
    public function getByCategory($params) {
        try {
            $category = $params['category'];
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
            
            $products = $this->productModel->getProductsByCategory($category, $limit);
            
            // Parse JSON fields
            foreach ($products as &$product) {
                $product['features'] = json_decode($product['features'] ?? '[]', true);
            }
            
            $this->successResponse($products);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch products: ' . $e->getMessage(), 500);
        }
    }
    
    public function search($params) {
        try {
            $query = $params['query'];
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
            
            $products = $this->productModel->searchProducts($query, $limit);
            
            // Parse JSON fields
            foreach ($products as &$product) {
                $product['features'] = json_decode($product['features'] ?? '[]', true);
            }
            
            $this->successResponse($products);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to search products: ' . $e->getMessage(), 500);
        }
    }
}
