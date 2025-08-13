<?php

require_once __DIR__ . '/../core/Model.php';

class BlogModel extends Model {
    protected $table = 'blog_posts';
    
    public function getPosts($filters = []) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.is_published = 1";
        $params = [];
        
        // Filter by category
        if (!empty($filters['category'])) {
            $sql .= " AND bp.category = ?";
            $params[] = $filters['category'];
        }
        
        // Search by title or content
        if (!empty($filters['search'])) {
            $sql .= " AND (bp.title LIKE ? OR bp.excerpt LIKE ? OR bp.content LIKE ?)";
            $searchTerm = '%' . $filters['search'] . '%';
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        // Filter by tag
        if (!empty($filters['tag'])) {
            $sql .= " AND JSON_SEARCH(bp.tags, 'one', ?) IS NOT NULL";
            $params[] = $filters['tag'];
        }
        
        // Order by
        $orderBy = $filters['order_by'] ?? 'published_at';
        $orderDir = $filters['order_dir'] ?? 'DESC';
        $sql .= " ORDER BY bp.{$orderBy} {$orderDir}";
        
        // Pagination
        if (!empty($filters['limit'])) {
            $sql .= " LIMIT " . (int)$filters['limit'];
            if (!empty($filters['offset'])) {
                $sql .= " OFFSET " . (int)$filters['offset'];
            }
        }
        
        return $this->fetchAll($sql, $params);
    }
    
    public function getPostBySlug($slug) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.slug = ? AND bp.is_published = 1";
        return $this->fetchOne($sql, [$slug]);
    }
    
    public function getPostsByCategory($category, $limit = null) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.category = ? AND bp.is_published = 1 
                ORDER BY bp.published_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT " . (int)$limit;
        }
        
        return $this->fetchAll($sql, [$category]);
    }
    
    public function searchPosts($query, $limit = null) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.is_published = 1 AND (
                    bp.title LIKE ? OR 
                    bp.excerpt LIKE ? OR 
                    bp.content LIKE ? OR
                    JSON_SEARCH(bp.tags, 'all', ?) IS NOT NULL
                )
                ORDER BY bp.published_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT " . (int)$limit;
        }
        
        $searchTerm = '%' . $query . '%';
        return $this->fetchAll($sql, [$searchTerm, $searchTerm, $searchTerm, $searchTerm]);
    }
    
    public function getFeaturedPosts($limit = 5) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.is_published = 1 
                ORDER BY bp.views_count DESC, bp.published_at DESC 
                LIMIT ?";
        return $this->fetchAll($sql, [$limit]);
    }
    
    public function getRecentPosts($limit = 5) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.is_published = 1 
                ORDER BY bp.published_at DESC 
                LIMIT ?";
        return $this->fetchAll($sql, [$limit]);
    }
    
    public function getRelatedPosts($postId, $category, $limit = 4) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.is_published = 1 AND bp.id != ? AND bp.category = ? 
                ORDER BY bp.published_at DESC 
                LIMIT ?";
        return $this->fetchAll($sql, [$postId, $category, $limit]);
    }
    
    public function createPost($data) {
        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['title']);
        }
        
        // Convert arrays to JSON
        if (isset($data['tags']) && is_array($data['tags'])) {
            $data['tags'] = json_encode($data['tags']);
        }
        
        if (isset($data['seo_keywords']) && is_array($data['seo_keywords'])) {
            $data['seo_keywords'] = json_encode($data['seo_keywords']);
        }
        
        // Set published_at if published
        if (isset($data['is_published']) && $data['is_published']) {
            $data['published_at'] = date('Y-m-d H:i:s');
        }
        
        return $this->create($data);
    }
    
    public function updatePost($id, $data) {
        // Generate slug if title changed
        if (!empty($data['title']) && empty($data['slug'])) {
            $data['slug'] = $this->generateSlug($data['title'], $id);
        }
        
        // Convert arrays to JSON
        if (isset($data['tags']) && is_array($data['tags'])) {
            $data['tags'] = json_encode($data['tags']);
        }
        
        if (isset($data['seo_keywords']) && is_array($data['seo_keywords'])) {
            $data['seo_keywords'] = json_encode($data['seo_keywords']);
        }
        
        // Set published_at if publishing for first time
        if (isset($data['is_published']) && $data['is_published']) {
            $currentPost = $this->getById($id);
            if ($currentPost && !$currentPost['published_at']) {
                $data['published_at'] = date('Y-m-d H:i:s');
            }
        }
        
        return $this->update($id, $data);
    }
    
    public function incrementViews($id) {
        $sql = "UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?";
        return $this->execute($sql, [$id]);
    }
    
    public function getCategories() {
        $sql = "SELECT category, COUNT(*) as post_count 
                FROM blog_posts 
                WHERE is_published = 1 
                GROUP BY category 
                ORDER BY post_count DESC, category ASC";
        return $this->fetchAll($sql);
    }
    
    public function getTags() {
        $sql = "SELECT tags FROM blog_posts WHERE is_published = 1 AND tags IS NOT NULL";
        $results = $this->fetchAll($sql);
        
        $allTags = [];
        foreach ($results as $result) {
            $tags = json_decode($result['tags'], true);
            if (is_array($tags)) {
                $allTags = array_merge($allTags, $tags);
            }
        }
        
        // Count tag frequency
        $tagCounts = array_count_values($allTags);
        arsort($tagCounts);
        
        return $tagCounts;
    }
    
    public function getBlogStats() {
        $sql = "SELECT 
                    COUNT(*) as total_posts,
                    COUNT(CASE WHEN is_published = 1 THEN 1 END) as published_posts,
                    COUNT(CASE WHEN is_published = 0 THEN 1 END) as draft_posts,
                    COUNT(DISTINCT category) as total_categories,
                    SUM(views_count) as total_views,
                    AVG(views_count) as average_views
                FROM blog_posts";
        return $this->fetchOne($sql);
    }
    
    public function getPostsByAuthor($authorId, $limit = null) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.author_id = ? AND bp.is_published = 1 
                ORDER BY bp.published_at DESC";
        
        if ($limit) {
            $sql .= " LIMIT " . (int)$limit;
        }
        
        return $this->fetchAll($sql, [$authorId]);
    }
    
    public function getPopularPosts($days = 30, $limit = 10) {
        $sql = "SELECT bp.*, u.name as author_name 
                FROM blog_posts bp 
                LEFT JOIN users u ON bp.author_id = u.id 
                WHERE bp.is_published = 1 
                AND bp.published_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
                ORDER BY bp.views_count DESC, bp.published_at DESC 
                LIMIT ?";
        return $this->fetchAll($sql, [$days, $limit]);
    }
}
