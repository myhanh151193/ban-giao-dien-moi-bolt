export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  badge?: string;
  demoLink?: string;
  // SEO Fields
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  altText?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  structuredData?: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  slug: string;
  content: string;
  tags: string[];
  // SEO Fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  altText?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  canonicalUrl?: string;
  metaRobots?: string;
  focusKeyword?: string;
}

export interface CheckoutFormData {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  paymentMethod: 'credit-card' | 'bank-transfer' | 'cod' | 'momo' | 'zalopay';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
  notes?: string;
}

export interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface OrderAdmin {
  id: string;
  customer: Customer;
  products: OrderProduct[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
  paymentMethod: string;
  notes: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  status: 'active' | 'inactive' | 'suspended';
  role: 'admin' | 'customer';
  joinDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CheckoutFormData;
  totalAmount: number;
  shippingFee: number;
  discount: number;
  finalAmount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  createdAt: Date;
}
