import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "E-commerce Pro Template",
    price: 2390000,
    originalPrice: 3590000,
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "E-commerce",
    rating: 4.8,
    reviews: 2847,
    description: "Mẫu website thương mại điện tử chuyên nghiệp và hiện đại",
    features: ["Responsive Design", "Cart Integration", "Payment Gateway", "Admin Dashboard"],
    inStock: true,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Corporate Business Template",
    price: 1890000,
    originalPrice: 2890000,
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Business",
    rating: 4.9,
    reviews: 1523,
    description: "Mẫu website doanh nghiệp sang trọng và uy tín",
    features: ["Modern Design", "Portfolio Section", "Contact Forms", "SEO Optimized"],
    inStock: true,
    badge: "New"
  },
  {
    id: 3,
    name: "Creative Portfolio Template",
    price: 1490000,
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Portfolio",
    rating: 4.7,
    reviews: 892,
    description: "Mẫu website portfolio sáng tạo cho designer và artist",
    features: ["Gallery Showcase", "Animation Effects", "Blog Integration", "Dark Mode"],
    inStock: true
  },
  {
    id: 4,
    name: "Restaurant & Cafe Template",
    price: 1690000,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Restaurant",
    rating: 4.6,
    reviews: 1247,
    description: "Mẫu website nhà hàng với menu và đặt bàn online",
    features: ["Menu Display", "Table Booking", "Food Gallery", "Location Map"],
    inStock: true
  },
  {
    id: 5,
    name: "Blog & Magazine Template",
    price: 1190000,
    image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Blog",
    rating: 4.5,
    reviews: 674,
    description: "Mẫu website blog và tạp chí trực tuyến",
    features: ["Article Management", "Comment System", "Social Share", "Newsletter"],
    inStock: false
  },
  {
    id: 6,
    name: "Agency Landing Page",
    price: 2190000,
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Landing",
    rating: 4.7,
    reviews: 1834,
    description: "Landing page chuyển đổi cao cho agency",
    features: ["Conversion Optimized", "Lead Forms", "Service Showcase", "Testimonials"],
    inStock: true,
    badge: "High Convert"
  }
];

export const categories = [
  "All",
  "E-commerce",
  "Business",
  "Portfolio",
  "Restaurant",
  "Blog",
  "Landing"
];
