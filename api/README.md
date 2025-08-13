# TemplateHub API

API backend cho website bán template TemplateHub được xây dựng bằng PHP thuần và MySQL.

## Cài đặt

### Yêu cầu hệ thống
- PHP 7.4 hoặc cao hơn
- MySQL 5.7 hoặc cao hơn
- Web server (Apache/Nginx)
- Composer (optional)

### Cấu hình cơ sở dữ liệu

1. Tạo database MySQL:
```sql
CREATE DATABASE templatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Import schema:
```bash
mysql -u username -p templatehub_db < database/templatehub_schema.sql
```

3. Cấu hình kết nối database trong file `.env`:
```env
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=templatehub_db
```

### Cấu hình web server

#### Apache
Đảm bảo mod_rewrite được bật và file `.htaccess` hoạt động.

#### Nginx
```nginx
location /api/ {
    try_files $uri $uri/ /api/index.php?$query_string;
}
```

## API Endpoints

### Authentication

#### Đăng ký
```
POST /api/auth/register
Content-Type: application/json

{
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "password": "password123",
    "phone": "0123456789"
}
```

#### Đăng nhập
```
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Đăng xuất
```
POST /api/auth/logout
Authorization: Bearer {token}
```

#### Lấy thông tin user hiện tại
```
GET /api/auth/me
Authorization: Bearer {token}
```

### Products/Templates

#### Lấy danh sách sản phẩm
```
GET /api/products?page=1&limit=12&category=e-commerce&search=keyword
```

#### Lấy chi tiết sản phẩm
```
GET /api/products/{id}
GET /api/products/{slug}
```

#### Tạo sản phẩm mới (Admin)
```
POST /api/products
Authorization: Bearer {admin_token}
Content-Type: application/json

{
    "name": "Template Name",
    "description": "Description",
    "price": 1500000,
    "original_price": 2000000,
    "image": "https://example.com/image.jpg",
    "category_id": 1,
    "features": ["Feature 1", "Feature 2"],
    "demo_link": "https://demo.example.com"
}
```

#### Cập nhật sản phẩm (Admin)
```
PUT /api/products/{id}
Authorization: Bearer {admin_token}
```

#### Xóa sản phẩm (Admin)
```
DELETE /api/products/{id}
Authorization: Bearer {admin_token}
```

### Categories

#### Lấy danh sách danh mục
```
GET /api/categories?with_count=true
```

#### Lấy chi tiết danh mục
```
GET /api/categories/{id}
GET /api/categories/{slug}
```

### Cart

#### Lấy giỏ hàng
```
GET /api/cart
Authorization: Bearer {token} (optional)
X-Session-ID: {session_id} (for guests)
```

#### Thêm sản phẩm vào giỏ
```
POST /api/cart/add
Content-Type: application/json

{
    "product_id": 1,
    "quantity": 2
}
```

#### Cập nhật số lượng
```
PUT /api/cart/update/{item_id}
Content-Type: application/json

{
    "quantity": 3
}
```

#### Xóa sản phẩm khỏi giỏ
```
DELETE /api/cart/remove/{item_id}
```

#### Xóa toàn bộ giỏ hàng
```
DELETE /api/cart/clear
```

### Orders

#### Tạo đơn hàng
```
POST /api/orders
Content-Type: application/json

{
    "customer_name": "Nguyễn Văn A",
    "customer_email": "user@example.com",
    "customer_phone": "0123456789",
    "shipping_address": "123 Đường ABC, Quận 1",
    "city": "TP.HCM",
    "district": "Quận 1",
    "postal_code": "70000",
    "payment_method": "cod",
    "notes": "Ghi chú đơn hàng"
}
```

#### Lấy danh sách đơn hàng
```
GET /api/orders?page=1&limit=10&status=pending
Authorization: Bearer {token}
```

#### Lấy chi tiết đơn hàng
```
GET /api/orders/{order_id}
Authorization: Bearer {token}
```

#### Cập nhật đơn hàng (Admin)
```
PUT /api/orders/{order_id}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
    "status": "confirmed",
    "payment_status": "paid"
}
```

### Blog

#### Lấy danh sách bài viết
```
GET /api/blog?page=1&limit=10&category=technology&search=keyword
```

#### Lấy chi tiết bài viết
```
GET /api/blog/{slug}
```

#### Tạo bài viết (Admin)
```
POST /api/blog
Authorization: Bearer {admin_token}
Content-Type: application/json

{
    "title": "Tiêu đề bài viết",
    "excerpt": "Tóm tắt bài viết",
    "content": "Nội dung chi tiết...",
    "image": "https://example.com/image.jpg",
    "category": "Technology",
    "tags": ["tag1", "tag2"],
    "is_published": true
}
```

### Users (Admin)

#### Lấy danh sách người dùng
```
GET /api/users?page=1&limit=10&status=active
Authorization: Bearer {admin_token}
```

#### Lấy chi tiết người dùng
```
GET /api/users/{id}
Authorization: Bearer {token}
```

#### Cập nhật người dùng
```
PUT /api/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Tên mới",
    "phone": "0987654321",
    "address": "Địa chỉ mới"
}
```

## Response Format

### Success Response
```json
{
    "success": true,
    "message": "Success message",
    "data": {
        // Response data
    }
}
```

### Error Response
```json
{
    "success": false,
    "message": "Error message",
    "errors": {
        // Additional error details
    }
}
```

### Pagination Response
```json
{
    "success": true,
    "data": {
        "items": [],
        "pagination": {
            "current_page": 1,
            "per_page": 10,
            "total": 100,
            "total_pages": 10
        }
    }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error

## Authentication

API sử dụng session-based authentication. Sau khi đăng nhập thành công, client sẽ nhận được token để sử dụng cho các request tiếp theo.

Header format:
```
Authorization: Bearer {token}
```

## CORS

API đã được cấu hình CORS để cho phép truy cập từ frontend React:
- Allow Origin: *
- Allow Methods: GET, POST, PUT, DELETE, OPTIONS
- Allow Headers: Content-Type, Authorization, X-Requested-With

## Error Handling

Tất cả lỗi sẽ được trả về dưới dạng JSON với format chuẩn. Chi tiết lỗi sẽ được ghi log để debugging.

## Security

- Passwords được hash bằng bcrypt
- SQL injection protection thông qua prepared statements
- CORS headers được thiết lập đúng cách
- Input validation cho tất cả endpoints

## Database Schema

Xem file `database/templatehub_schema.sql` để biết chi tiết cấu trúc database.

Các bảng chính:
- `users` - Người dùng
- `categories` - Danh mục sản phẩm
- `products` - Sản phẩm/templates
- `cart_items` - Giỏ hàng
- `orders` - Đơn hàng
- `order_items` - Chi tiết đơn hàng
- `blog_posts` - Bài viết blog
- `product_reviews` - Đánh giá sản phẩm
- `testimonials` - Lời chứng thực
- `settings` - Cài đặt hệ thống
- `user_sessions` - Phiên đăng nhập

## Development

### Local Development
1. Clone repository
2. Cấu hình database và file `.env`
3. Start web server tại thư mục `api/`
4. API sẽ accessible tại `http://localhost/api/`

### Testing
Sử dụng Postman hoặc curl để test các endpoints.

### Logging
Logs được ghi tại system error log. Trong môi trường production, cấu hình log file riêng.

## Production Deployment

1. Upload files lên server
2. Cấu hình database production
3. Cập nhật file `.env` với thông tin production
4. Thiết lập HTTPS
5. Cấu hình cache và optimization
6. Monitor logs và performance
