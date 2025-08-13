import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '../types';
import { apiService } from '../services/apiService';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCart();
      setItems(response.data || response || []);
    } catch (error: any) {
      console.warn('⚠️ API không khả dụng - chuyển sang chế độ offline');
      console.log('🛒 Sử dụng giỏ hàng trống cho chế độ offline');

      // Use empty cart when API fails
      setItems([]);
      setError('API không khả dụng - chế độ offline');

      console.log('✅ Giỏ hàng offline đã sẵn sàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    setError(null);

    const existingItem = items.find(item => item.product.id === product.id);

    // In offline mode, work directly with local state
    if (error?.includes('offline') || error?.includes('không khả dụng')) {
      setItems(prevItems => {
        if (existingItem) {
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { product, quantity: 1 }];
      });
      return;
    }

    // Try API first, but don't show errors - just fallback silently
    try {
      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        const response = await apiService.addToCart(product.id.toString(), 1);
        const newItem = response.data || { product, quantity: 1 };
        setItems(prevItems => [...prevItems, newItem]);
      }
    } catch (apiError) {
      // Silent fallback to local state - no error messages
      console.log('🛒 API không khả dụng - sử dụng giỏ hàng offline');

      setItems(prevItems => {
        if (existingItem) {
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      const item = items.find(item => item.product.id === productId);
      if (item) {
        await apiService.removeFromCart(item.id?.toString() || productId.toString());
      }
      setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError('Không thể xóa sản phẩm khỏi giỏ hàng');
      
      // Fallback to local state if API fails
      setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    setError(null);

    // In offline mode, work directly with local state
    if (error?.includes('offline') || error?.includes('không khả dụng')) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
      return;
    }

    // Try API first, but don't show errors - just fallback silently
    try {
      const item = items.find(item => item.product.id === productId);
      if (item) {
        await apiService.updateCartItem(item.id?.toString() || productId.toString(), quantity);
      }

      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (apiError) {
      // Silent fallback to local state
      console.log('🛒 API không khả dụng - cập nhật giỏ hàng offline');

      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      // Clear cart on server
      await Promise.all(items.map(item => 
        apiService.removeFromCart(item.id?.toString() || item.product.id.toString())
      ));
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Không thể xóa giỏ hàng');
      
      // Fallback to local state if API fails
      setItems([]);
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const value: CartContextType = {
    items,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
