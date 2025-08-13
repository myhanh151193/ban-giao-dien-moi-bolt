import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OrderAdmin } from '../types';

interface OrderContextType {
  orders: OrderAdmin[];
  addOrder: (order: Omit<OrderAdmin, 'id'>) => void;
  updateOrder: (id: string, order: Partial<OrderAdmin>) => void;
  updateOrderStatus: (id: string, status: OrderAdmin['status']) => void;
  deleteOrder: (id: string) => void;
  getOrderById: (id: string) => OrderAdmin | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

const initialOrders: OrderAdmin[] = [
  {
    id: 'DH001',
    customer: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789'
    },
    products: [
      { name: 'E-commerce Pro Template', quantity: 1, price: 2390000 }
    ],
    total: 2390000,
    status: 'completed',
    createdAt: '2024-01-15 10:30',
    shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
    paymentMethod: 'cod',
    notes: 'Giao vào buổi chiều'
  },
  {
    id: 'DH002',
    customer: {
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321'
    },
    products: [
      { name: 'Corporate Business Template', quantity: 1, price: 1890000 }
    ],
    total: 1890000,
    status: 'pending',
    createdAt: '2024-01-14 15:45',
    shippingAddress: '456 Đường XYZ, Quận 3, TP.HCM',
    paymentMethod: 'cod',
    notes: ''
  },
  {
    id: 'DH003',
    customer: {
      name: 'Lê Minh C',
      email: 'leminhc@email.com',
      phone: '0369852147'
    },
    products: [
      { name: 'Creative Portfolio Template', quantity: 1, price: 1490000 },
      { name: 'Blog & Magazine Template', quantity: 1, price: 1190000 }
    ],
    total: 2680000,
    status: 'processing',
    createdAt: '2024-01-13 09:15',
    shippingAddress: '789 Đường DEF, Quận 7, TP.HCM',
    paymentMethod: 'cod',
    notes: 'Khách hàng VIP'
  },
  {
    id: 'DH004',
    customer: {
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0741258963'
    },
    products: [
      { name: 'Restaurant & Cafe Template', quantity: 1, price: 1690000 }
    ],
    total: 1690000,
    status: 'cancelled',
    createdAt: '2024-01-12 14:20',
    shippingAddress: '321 Đường GHI, Quận 5, TP.HCM',
    paymentMethod: 'cod',
    notes: 'Khách hàng hủy đơn'
  },
  {
    id: 'DH005',
    customer: {
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0852963741'
    },
    products: [
      { name: 'Agency Landing Page', quantity: 1, price: 2190000 }
    ],
    total: 2190000,
    status: 'completed',
    createdAt: '2024-01-11 11:00',
    shippingAddress: '654 Đường JKL, Quận 2, TP.HCM',
    paymentMethod: 'cod',
    notes: ''
  }
];

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrderAdmin[]>(initialOrders);

  const addOrder = (orderData: Omit<OrderAdmin, 'id'>) => {
    const newOrder: OrderAdmin = {
      ...orderData,
      id: `DH${String(orders.length + 1).padStart(3, '0')}`,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrder = (id: string, orderData: Partial<OrderAdmin>) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, ...orderData } : order
      )
    );
  };

  const updateOrderStatus = (id: string, status: OrderAdmin['status']) => {
    updateOrder(id, { status });
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const value: OrderContextType = {
    orders,
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
