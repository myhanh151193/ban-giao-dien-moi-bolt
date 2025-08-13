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
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
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
