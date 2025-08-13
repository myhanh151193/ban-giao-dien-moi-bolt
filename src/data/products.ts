// Fallback data when API is unavailable
// Data is normally fetched from: https://medisosoft.com/path/api/products
// Backend handles routing to controllers/ folder internally

export const products = [
  {
    id: 1,
    name: 'E-commerce Pro Template',
    price: 2390000,
    originalPrice: 2990000,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'E-commerce',
    rating: 5,
    reviews: 127,
    description: 'Template website thương mại điện tử chuyên nghiệp với đầy đủ tính năng quản lý sản phẩm, giỏ hàng, thanh toán và báo cáo.',
    features: [
      'Responsive design cho mọi thiết bị',
      'Tích hợp thanh toán trực tuyến',
      'Quản lý inventory tự động',
      'SEO tối ưu',
      'Dashboard analytics'
    ],
    inStock: true,
    badge: 'Bestseller',
    demoLink: 'https://example.com/demo/ecommerce',
    slug: 'e-commerce-pro-template'
  },
  {
    id: 2,
    name: 'Corporate Business Template',
    price: 1890000,
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Business',
    rating: 4.8,
    reviews: 89,
    description: 'Template website doanh nghiệp sang trọng, chuyên nghiệp với thiết kế hiện đại và tính năng đầy đủ.',
    features: [
      'Landing page chuyển đổi cao',
      'Tích h��p form liên hệ',
      'Showcase portfolio',
      'Blog tích hợp',
      'Tối ưu tốc độ'
    ],
    inStock: true,
    slug: 'corporate-business-template'
  },
  {
    id: 3,
    name: 'Creative Portfolio Template',
    price: 1490000,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Portfolio',
    rating: 4.9,
    reviews: 156,
    description: 'Template portfolio sáng tạo cho designers, artists và creative professionals.',
    features: [
      'Gallery responsive',
      'Animation mượt mà',
      'Dark/Light mode',
      'Contact form',
      'Social media integration'
    ],
    inStock: true,
    badge: 'New',
    slug: 'creative-portfolio-template'
  }
];
