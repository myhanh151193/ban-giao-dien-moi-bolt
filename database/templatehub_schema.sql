-- TemplateHub Database Schema
-- Tạo database cho website bán template

CREATE DATABASE IF NOT EXISTS templatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE templatehub_db;

-- Bảng danh mục sản phẩm
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng sản phẩm/templates
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DECIMAL(12,0) NOT NULL,
    original_price DECIMAL(12,0),
    image VARCHAR(500) NOT NULL,
    category_id INT NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    features JSON,
    in_stock BOOLEAN DEFAULT TRUE,
    badge VARCHAR(50),
    demo_link VARCHAR(500),
    download_link VARCHAR(500),
    
    -- SEO Fields
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords JSON,
    alt_text VARCHAR(255),
    open_graph_title VARCHAR(255),
    open_graph_description TEXT,
    open_graph_image VARCHAR(500),
    structured_data JSON,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_active (is_active),
    INDEX idx_slug (slug)
);

-- Bảng người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    address TEXT,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    role ENUM('admin', 'customer') DEFAULT 'customer',
    email_verified_at TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_role (role)
);

-- Bảng đơn hàng
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    city VARCHAR(100),
    district VARCHAR(100),
    postal_code VARCHAR(20),
    
    subtotal DECIMAL(12,0) NOT NULL,
    shipping_fee DECIMAL(12,0) DEFAULT 0,
    discount DECIMAL(12,0) DEFAULT 0,
    total_amount DECIMAL(12,0) NOT NULL,
    
    payment_method ENUM('credit-card', 'bank-transfer', 'cod', 'momo', 'zalopay') NOT NULL,
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    
    status ENUM('pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created (created_at)
);

-- Bảng chi tiết đơn hàng
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(12,0) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price DECIMAL(12,0) NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
);

-- Bảng giỏ hàng
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id VARCHAR(100),
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    UNIQUE KEY unique_session_product (session_id, product_id),
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_product (product_id)
);

-- Bảng bài viết blog
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    image VARCHAR(500) NOT NULL,
    author_id INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags JSON,
    read_time INT DEFAULT 0,
    views_count INT DEFAULT 0,
    
    -- SEO Fields
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords JSON,
    alt_text VARCHAR(255),
    open_graph_title VARCHAR(255),
    open_graph_description TEXT,
    open_graph_image VARCHAR(500),
    canonical_url VARCHAR(500),
    meta_robots VARCHAR(50),
    focus_keyword VARCHAR(100),
    
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_author (author_id),
    INDEX idx_published (is_published),
    INDEX idx_slug (slug),
    INDEX idx_category (category)
);

-- Bảng đánh giá sản phẩm
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product (product_id),
    INDEX idx_user (user_id),
    INDEX idx_approved (is_approved),
    INDEX idx_rating (rating)
);

-- Bảng testimonials
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    avatar VARCHAR(255),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    product_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_product (product_id),
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order)
);

-- Bảng cài đặt hệ thống
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (setting_key)
);

-- Bảng sessions cho auth
CREATE TABLE user_sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_activity (last_activity)
);

-- Thêm dữ liệu mẫu cho categories
INSERT INTO categories (name, slug, description) VALUES
('All', 'all', 'Tất cả các template'),
('E-commerce', 'e-commerce', 'Template thương mại điện tử'),
('Business', 'business', 'Template doanh nghiệp'),
('Portfolio', 'portfolio', 'Template portfolio cá nhân'),
('Restaurant', 'restaurant', 'Template nhà hàng'),
('Blog', 'blog', 'Template blog và tin tức'),
('Landing', 'landing', 'Template landing page');

-- Thêm admin user mặc định
INSERT INTO users (name, email, password_hash, role, status) VALUES
('Admin', 'admin@templatehub.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'active');

-- Thêm dữ liệu mẫu cho products
INSERT INTO products (name, slug, description, price, original_price, image, category_id, rating, reviews_count, features, badge, demo_link) VALUES
('E-commerce Pro Template', 'e-commerce-pro-template', 'Mẫu website thương mại điện tử chuyên nghiệp và hiện đại', 2390000, 3590000, 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500', 2, 4.8, 2847, '["Responsive Design", "Cart Integration", "Payment Gateway", "Admin Dashboard"]', 'Bestseller', 'https://ecommerce-pro-demo.netlify.app'),
('Corporate Business Template', 'corporate-business-template', 'Mẫu website doanh nghiệp sang trọng và uy tín', 1890000, 2890000, 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=500', 3, 4.9, 1523, '["Modern Design", "Portfolio Section", "Contact Forms", "SEO Optimized"]', 'New', 'https://corporate-business-demo.netlify.app'),
('Creative Portfolio Template', 'creative-portfolio-template', 'Mẫu website portfolio sáng tạo cho designer và artist', 1490000, NULL, 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500', 4, 4.7, 892, '["Gallery Showcase", "Animation Effects", "Blog Integration", "Dark Mode"]', NULL, 'https://creative-portfolio-demo.netlify.app'),
('Restaurant & Cafe Template', 'restaurant-cafe-template', 'Mẫu website nhà hàng với menu và đặt bàn online', 1690000, NULL, 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=500', 5, 4.6, 1247, '["Menu Display", "Table Booking", "Food Gallery", "Location Map"]', NULL, 'https://restaurant-cafe-demo.netlify.app'),
('Blog & Magazine Template', 'blog-magazine-template', 'Mẫu website blog và tạp chí trực tuyến', 1190000, NULL, 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=500', 6, 4.5, 674, '["Article Management", "Comment System", "Social Share", "Newsletter"]', NULL, 'https://blog-magazine-demo.netlify.app'),
('Agency Landing Page', 'agency-landing-page', 'Landing page chuyển đổi cao cho agency', 2190000, NULL, 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500', 7, 4.7, 1834, '["Conversion Optimized", "Lead Forms", "Service Showcase", "Testimonials"]', 'High Convert', 'https://agency-landing-demo.netlify.app');

-- Thêm dữ liệu mẫu cho blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image, author_id, category, tags, read_time, seo_title, seo_description, seo_keywords, alt_text, open_graph_title, open_graph_description, open_graph_image, is_published, published_at) VALUES
('Top 10 Smartphone Tốt Nhất Năm 2024', 'top-10-smartphone-2024', 'Khám phá những chiếc smartphone hàng đầu với công nghệ tiên tiến nhất, từ camera AI đến hiệu suất xử lý vượt trội.', '<h2>Smartphone là thiết bị không thể thiếu trong cuộc sống hiện đại</h2><p>Năm 2024 đánh dấu một bước tiến vượt bậc trong công nghệ smartphone với sự xuất hiện của AI tích hợp, camera cải tiến và hiệu suất xử lý mạnh mẽ hơn bao giờ hết.</p>', 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600', 1, 'Reviews', '["Smartphone", "Reviews", "Technology", "2024"]', 8, 'Top 10 Smartphone Tốt Nhất 2024 - Đánh Giá Chi Tiết', 'Khám phá top 10 smartphone tốt nhất năm 2024 với công nghệ AI tiên tiến, camera chuyên nghiệp và hiệu suất vượt trội.', '["smartphone 2024", "top smartphone", "iPhone 15 Pro Max", "Galaxy S24 Ultra"]', 'Top 10 smartphone tốt nhất năm 2024', 'Top 10 Smartphone Tốt Nhất Năm 2024', 'Khám phá những chiếc smartphone hàng đầu với công nghệ tiên tiến nhất', 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1200', TRUE, NOW());

-- Thêm settings mặc định
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'TemplateHub', 'string', 'Tên website'),
('site_description', 'Nền tảng template website chuyên nghiệp', 'string', 'Mô tả website'),
('contact_email', 'contact@templatehub.com', 'string', 'Email liên hệ'),
('contact_phone', '1900-xxxx', 'string', 'Số điện thoại liên hệ'),
('shipping_fee', '50000', 'number', 'Phí vận chuyển mặc định'),
('free_shipping_threshold', '1000000', 'number', 'Miễn phí vận chuyển từ'),
('currency', 'VND', 'string', 'Đơn vị tiền tệ'),
('items_per_page', '12', 'number', 'Số sản phẩm mỗi trang');
