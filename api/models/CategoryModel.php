<?php

require_once __DIR__ . '/../core/Model.php';

class CategoryModel extends Model {
    protected $table = 'categories';
    
    public function getActiveCategories() {
        $sql = "SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order ASC, name ASC";
        return $this->fetchAll($sql);
    }
    
    public function getCategoryBySlug($slug) {
        $sql = "SELECT * FROM categories WHERE slug = ? AND is_active = 1";
        return $this->fetchOne($sql, [$slug]);
    }
    
    public function getCategoriesWithCount() {
        $sql = "SELECT c.*, COUNT(p.id) as product_count 
                FROM categories c 
                LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1 
                WHERE c.is_active = 1 
                GROUP BY c.id 
                ORDER BY c.sort_order ASC, c.name ASC";
        return $this->fetchAll($sql);
    }
    
    public function createCategory($data) {
        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['name']);
        }
        
        return $this->create($data);
    }
    
    public function updateCategory($id, $data) {
        // Generate slug if name changed
        if (!empty($data['name']) && empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['name'], $id);
        }
        
        return $this->update($id, $data);
    }
}
