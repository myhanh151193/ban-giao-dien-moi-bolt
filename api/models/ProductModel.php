<?php

require_once __DIR__ . '/../core/Model.php';

class ProductModel extends Model {
    protected $table = 'products';
    
    public function getProducts($filters = []) {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.is_active = 1";
        $params = [];
        
        // Filter by category
        if (!empty($filters['category']) && $filters['category'] !== 'all') {
            $sql .= " AND c.slug = ?";
            $params[] = $filters['category'];
        }
        
        // Search by name or description
        if (!empty($filters['search'])) {
            $sql .= " AND (p.name LIKE ? OR p.description LIKE ?)";
            $params[] = '%' . $filters['search'] . '%';
            $params[] = '%' . $filters['search'] . '%';
        }
        
        // Filter by price range
        if (!empty($filters['min_price'])) {
            $sql .= " AND p.price >= ?";
            $params[] = $filters['min_price'];
        }
        
        if (!empty($filters['max_price'])) {
            $sql .= " AND p.price <= ?";
            $params[] = $filters['max_price'];
        }
        
        // Filter by in stock
        if (isset($filters['in_stock']) && $filters['in_stock']) {
            $sql .= " AND p.in_stock = 1";
        }
        
        // Order by
        $orderBy = $filters['order_by'] ?? 'created_at';
        $orderDir = $filters['order_dir'] ?? 'DESC';
        $sql .= " ORDER BY p.{$orderBy} {$orderDir}";
        
        // Pagination
        if (!empty($filters['limit'])) {
            $sql .= " LIMIT " . (int)$filters['limit'];
            if (!empty($filters['offset'])) {
                $sql .= " OFFSET " . (int)$filters['offset'];
            }
        }
        
        return $this->fetchAll($sql, $params);
    }
    
    public function getProductBySlug($slug) {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.slug = ? AND p.is_active = 1";
        return $this->fetchOne($sql, [$slug]);
    }
    
    public function getProductsByCategory($categorySlug, $limit = null) {
        $sql = "SELECT p.*, c.name as category_name 
                FROM products p 
                INNER JOIN categories c ON p.category_id = c.id 
                WHERE c.slug = ? AND p.is_active = 1 
                ORDER BY p.created_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT " . (int)$limit;
        }
        
        return $this->fetchAll($sql, [$categorySlug]);
    }
    
    public function searchProducts($query, $limit = null) {
        $sql = "SELECT p.*, c.name as category_name 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.is_active = 1 AND (
                    p.name LIKE ? OR 
                    p.description LIKE ? OR 
                    JSON_SEARCH(p.features, 'all', ?) IS NOT NULL
                )
                ORDER BY p.created_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT " . (int)$limit;
        }
        
        $searchTerm = '%' . $query . '%';
        return $this->fetchAll($sql, [$searchTerm, $searchTerm, $searchTerm]);
    }
    
    public function getFeaturedProducts($limit = 6) {
        $sql = "SELECT p.*, c.name as category_name 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.is_active = 1 AND p.badge IS NOT NULL 
                ORDER BY p.rating DESC, p.reviews_count DESC 
                LIMIT ?";
        return $this->fetchAll($sql, [$limit]);
    }
    
    public function getRelatedProducts($productId, $categoryId, $limit = 4) {
        $sql = "SELECT p.*, c.name as category_name 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.is_active = 1 AND p.id != ? AND p.category_id = ? 
                ORDER BY p.rating DESC 
                LIMIT ?";
        return $this->fetchAll($sql, [$productId, $categoryId, $limit]);
    }
    
    public function createProduct($data) {
        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['name']);
        }
        
        // Convert arrays to JSON
        if (isset($data['features']) && is_array($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }
        
        if (isset($data['seo_keywords']) && is_array($data['seo_keywords'])) {
            $data['seo_keywords'] = json_encode($data['seo_keywords']);
        }
        
        return $this->create($data);
    }
    
    public function updateProduct($id, $data) {
        // Generate slug if name changed
        if (!empty($data['name']) && empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['name'], $id);
        }
        
        // Convert arrays to JSON
        if (isset($data['features']) && is_array($data['features'])) {
            $data['features'] = json_encode($data['features']);
        }
        
        if (isset($data['seo_keywords']) && is_array($data['seo_keywords'])) {
            $data['seo_keywords'] = json_encode($data['seo_keywords']);
        }
        
        return $this->update($id, $data);
    }
    
    public function getProductStats() {
        $sql = "SELECT 
                    COUNT(*) as total_products,
                    COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_products,
                    COUNT(CASE WHEN in_stock = 1 THEN 1 END) as in_stock_products,
                    AVG(price) as average_price,
                    AVG(rating) as average_rating
                FROM products";
        return $this->fetchOne($sql);
    }
    
    public function updateProductRating($productId) {
        $sql = "UPDATE products p SET 
                    rating = (SELECT AVG(rating) FROM product_reviews WHERE product_id = p.id AND is_approved = 1),
                    reviews_count = (SELECT COUNT(*) FROM product_reviews WHERE product_id = p.id AND is_approved = 1)
                WHERE p.id = ?";
        return $this->execute($sql, [$productId]);
    }
}
