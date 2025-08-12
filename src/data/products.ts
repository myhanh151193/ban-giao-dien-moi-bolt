import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Smartphones",
    rating: 4.8,
    reviews: 2847,
    description: "Titan mới. Mạnh mẽ hơn. Pro hơn.",
    features: ["Chip A17 Pro", "Camera Action 48MP", "Titanium Design", "USB-C"],
    inStock: true,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "MacBook Pro 14\"",
    price: 1999,
    originalPrice: 2199,
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Laptops",
    rating: 4.9,
    reviews: 1523,
    description: "Hiệu suất đột phá với chip M3 Pro",
    features: ["Chip M3 Pro", "14-inch Liquid Retina XDR", "16GB RAM", "512GB SSD"],
    inStock: true,
    badge: "New"
  },
  {
    id: 3,
    name: "AirPods Pro (3rd Gen)",
    price: 249,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Audio",
    rating: 4.7,
    reviews: 892,
    description: "Âm thanh không gian cá nhân hóa",
    features: ["Active Noise Cancellation", "Spatial Audio", "USB-C Case", "Up to 30h battery"],
    inStock: true
  },
  {
    id: 4,
    name: "iPad Air 11\"",
    price: 599,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Tablets",
    rating: 4.6,
    reviews: 1247,
    description: "Mạnh mẽ. Đầy màu sắc. Tuyệt vời.",
    features: ["Chip M2", "11-inch Liquid Retina", "Apple Pencil Pro support", "All-day battery"],
    inStock: true
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 399,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Wearables",
    rating: 4.5,
    reviews: 674,
    description: "Thông minh hơn. Sáng hơn. Mạnh mẽ hơn.",
    features: ["S9 SiP", "Double Tap gesture", "Siri on-device", "Carbon neutral"],
    inStock: false
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Smartphones",
    rating: 4.7,
    reviews: 1834,
    description: "Galaxy AI is here",
    features: ["200MP Camera", "S Pen", "Titanium Frame", "Galaxy AI"],
    inStock: true,
    badge: "AI Powered"
  }
];

export const categories = [
  "All",
  "Smartphones", 
  "Laptops",
  "Tablets",
  "Audio",
  "Wearables"
];