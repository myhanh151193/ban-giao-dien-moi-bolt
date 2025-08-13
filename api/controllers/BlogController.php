<?php

require_once __DIR__ . '/../core/Controller.php';
require_once __DIR__ . '/../models/BlogModel.php';

class BlogController extends Controller {
    private $blogModel;
    
    public function __construct() {
        $this->blogModel = new BlogModel();
    }
    
    public function index($params = []) {
        try {
            $filters = [
                'category' => $_GET['category'] ?? null,
                'search' => $_GET['search'] ?? null,
                'tag' => $_GET['tag'] ?? null,
                'order_by' => $_GET['order_by'] ?? 'published_at',
                'order_dir' => $_GET['order_dir'] ?? 'DESC'
            ];
            
            $pagination = $this->getPaginationParams();
            $filters['limit'] = $pagination['limit'];
            $filters['offset'] = $pagination['offset'];
            
            $posts = $this->blogModel->getPosts($filters);
            
            // Get total count for pagination
            $total = $this->blogModel->count("is_published = 1");
            
            // Parse JSON fields
            foreach ($posts as &$post) {
                $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                $post['seo_keywords'] = json_decode($post['seo_keywords'] ?? '[]', true);
                
                // Remove content from list view (only excerpt)
                unset($post['content']);
            }
            
            $response = [
                'posts' => $posts,
                'pagination' => [
                    'current_page' => $pagination['page'],
                    'per_page' => $pagination['limit'],
                    'total' => $total,
                    'total_pages' => ceil($total / $pagination['limit'])
                ]
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch blog posts: ' . $e->getMessage(), 500);
        }
    }
    
    public function show($params) {
        try {
            $slug = $params['slug'];
            
            $post = $this->blogModel->getPostBySlug($slug);
            
            if (!$post) {
                $this->errorResponse('Blog post not found', 404);
            }
            
            // Parse JSON fields
            $post['tags'] = json_decode($post['tags'] ?? '[]', true);
            $post['seo_keywords'] = json_decode($post['seo_keywords'] ?? '[]', true);
            
            // Increment view count
            $this->blogModel->incrementViews($post['id']);
            
            // Get related posts
            $relatedPosts = $this->blogModel->getRelatedPosts($post['id'], $post['category'], 4);
            
            foreach ($relatedPosts as &$related) {
                $related['tags'] = json_decode($related['tags'] ?? '[]', true);
                unset($related['content']); // Only excerpt for related posts
            }
            
            $response = [
                'post' => $post,
                'related_posts' => $relatedPosts
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch blog post: ' . $e->getMessage(), 500);
        }
    }
    
    public function store($params = []) {
        try {
            $user = $this->requireAuth();
            
            // Only admins can create blog posts
            if ($user['role'] !== 'admin') {
                $this->errorResponse('Admin access required', 403);
            }
            
            $data = $this->getJsonInput();
            
            // Validate required fields
            $required = ['title', 'excerpt', 'content', 'image', 'category'];
            $this->validateRequired($data, $required);
            
            // Set author
            $data['author_id'] = $user['user_id'];
            
            // Set default values
            $data['is_published'] = $data['is_published'] ?? false;
            $data['views_count'] = 0;
            
            $postId = $this->blogModel->createPost($data);
            
            $post = $this->blogModel->getById($postId);
            $post['tags'] = json_decode($post['tags'] ?? '[]', true);
            $post['seo_keywords'] = json_decode($post['seo_keywords'] ?? '[]', true);
            
            $this->successResponse($post, 'Blog post created successfully');
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to create blog post: ' . $e->getMessage(), 500);
        }
    }
    
    public function update($params) {
        try {
            $user = $this->requireAuth();
            
            // Only admins can update blog posts
            if ($user['role'] !== 'admin') {
                $this->errorResponse('Admin access required', 403);
            }
            
            $id = $params['id'];
            $data = $this->getJsonInput();
            
            // Check if post exists
            $post = $this->blogModel->getById($id);
            if (!$post) {
                $this->errorResponse('Blog post not found', 404);
            }
            
            $updated = $this->blogModel->updatePost($id, $data);
            
            if ($updated) {
                $post = $this->blogModel->getById($id);
                $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                $post['seo_keywords'] = json_decode($post['seo_keywords'] ?? '[]', true);
                
                $this->successResponse($post, 'Blog post updated successfully');
            } else {
                $this->errorResponse('No changes made', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to update blog post: ' . $e->getMessage(), 500);
        }
    }
    
    public function delete($params) {
        try {
            $user = $this->requireAuth();
            
            // Only admins can delete blog posts
            if ($user['role'] !== 'admin') {
                $this->errorResponse('Admin access required', 403);
            }
            
            $id = $params['id'];
            
            // Check if post exists
            $post = $this->blogModel->getById($id);
            if (!$post) {
                $this->errorResponse('Blog post not found', 404);
            }
            
            $deleted = $this->blogModel->delete($id);
            
            if ($deleted) {
                $this->successResponse(null, 'Blog post deleted successfully');
            } else {
                $this->errorResponse('Failed to delete blog post', 400);
            }
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to delete blog post: ' . $e->getMessage(), 500);
        }
    }
    
    public function getByCategory($params) {
        try {
            $category = $params['category'];
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
            
            $posts = $this->blogModel->getPostsByCategory($category, $limit);
            
            // Parse JSON fields and remove content
            foreach ($posts as &$post) {
                $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                unset($post['content']);
            }
            
            $this->successResponse($posts);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch blog posts: ' . $e->getMessage(), 500);
        }
    }
    
    public function search($params) {
        try {
            $query = $params['query'];
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
            
            $posts = $this->blogModel->searchPosts($query, $limit);
            
            // Parse JSON fields and remove content
            foreach ($posts as &$post) {
                $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                unset($post['content']);
            }
            
            $this->successResponse($posts);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to search blog posts: ' . $e->getMessage(), 500);
        }
    }
    
    public function getFeatured($params = []) {
        try {
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
            
            $posts = $this->blogModel->getFeaturedPosts($limit);
            
            // Parse JSON fields and remove content
            foreach ($posts as &$post) {
                $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                unset($post['content']);
            }
            
            $this->successResponse($posts);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch featured posts: ' . $e->getMessage(), 500);
        }
    }
    
    public function getRecent($params = []) {
        try {
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
            
            $posts = $this->blogModel->getRecentPosts($limit);
            
            // Parse JSON fields and remove content
            foreach ($posts as &$post) {
                $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                unset($post['content']);
            }
            
            $this->successResponse($posts);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch recent posts: ' . $e->getMessage(), 500);
        }
    }
    
    public function getCategories($params = []) {
        try {
            $categories = $this->blogModel->getCategories();
            $this->successResponse($categories);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch categories: ' . $e->getMessage(), 500);
        }
    }
    
    public function getTags($params = []) {
        try {
            $tags = $this->blogModel->getTags();
            $this->successResponse($tags);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch tags: ' . $e->getMessage(), 500);
        }
    }
    
    public function getStats($params = []) {
        try {
            $this->requireAdmin();
            
            $stats = $this->blogModel->getBlogStats();
            $categories = $this->blogModel->getCategories();
            $popularPosts = $this->blogModel->getPopularPosts(30, 10);
            
            $response = [
                'overview' => $stats,
                'categories' => $categories,
                'popular_posts' => $popularPosts
            ];
            
            $this->successResponse($response);
            
        } catch (Exception $e) {
            $this->errorResponse('Failed to fetch blog stats: ' . $e->getMessage(), 500);
        }
    }
}
