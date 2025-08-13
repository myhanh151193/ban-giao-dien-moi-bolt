import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { OrderAdmin } from '../types';
import { apiService } from '../services/apiService';

interface OrderContextType {
  orders: OrderAdmin[];
  loading: boolean;
  error: string | null;
  addOrder: (order: Omit<OrderAdmin, 'id'>) => Promise<void>;
  updateOrder: (id: string, order: Partial<OrderAdmin>) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderAdmin['status']) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  getOrderById: (id: string) => OrderAdmin | undefined;
  refreshOrders: () => Promise<void>;
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

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrderAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getOrders();
      setOrders(response.data || response);
    } catch (error: any) {
      console.warn('⚠️ API không khả dụng - chuyển sang dữ liệu offline');
      console.log('📦 Đang tải danh sách đơn hàng từ fallback...');

      // Import fallback data dynamically
      const { orders: fallbackOrders } = await import('../data/orders');
      setOrders(fallbackOrders);
      setError('API không khả dụng - sử dụng dữ liệu offline');

      console.log(`✅ Đã tải ${fallbackOrders.length} đơn hàng từ dữ liệu offline`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addOrder = async (orderData: Omit<OrderAdmin, 'id'>) => {
    try {
      setError(null);
      const orderToSend = {
        ...orderData,
        createdAt: new Date().toLocaleString('vi-VN'),
      };
      
      const response = await apiService.createOrder(orderToSend);
      const newOrder = response.data || { ...orderToSend, id: `DH${Date.now().toString().slice(-6)}` };
      setOrders(prev => [newOrder, ...prev]);
    } catch (error) {
      console.error('Error adding order:', error);
      setError('Không thể thêm đơn hàng');
      throw error;
    }
  };

  const updateOrder = async (id: string, orderData: Partial<OrderAdmin>) => {
    try {
      setError(null);
      const response = await apiService.updateOrder?.(id, orderData) || { data: orderData };
      const updatedOrder = response.data || response;
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, ...updatedOrder } : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
      setError('Không thể cập nhật đơn hàng');
      throw error;
    }
  };

  const updateOrderStatus = async (id: string, status: OrderAdmin['status']) => {
    await updateOrder(id, { status });
  };

  const deleteOrder = async (id: string) => {
    try {
      setError(null);
      await apiService.deleteOrder?.(id);
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Không thể xóa đơn hàng');
      throw error;
    }
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const refreshOrders = async () => {
    await fetchOrders();
  };

  const value: OrderContextType = {
    orders,
    loading,
    error,
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    refreshOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
