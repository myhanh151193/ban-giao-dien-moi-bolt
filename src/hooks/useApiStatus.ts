import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { usePosts } from '../context/PostContext';
import { useUsers } from '../context/UserContext';
import { useOrders } from '../context/OrderContext';
import { useSettings } from '../context/SettingsContext';

export const useApiStatus = () => {
  const [isApiAvailable, setIsApiAvailable] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);

  const { error: productsError } = useProducts();
  const { error: postsError } = usePosts();
  const { error: usersError } = useUsers();
  const { error: ordersError } = useOrders();
  const { error: settingsError } = useSettings();

  useEffect(() => {
    const errors = [productsError, postsError, usersError, ordersError, settingsError].filter(Boolean);
    
    if (errors.length > 0) {
      setIsApiAvailable(false);
      setLastError(errors[0]); // Show the first error
    } else {
      setIsApiAvailable(true);
      setLastError(null);
    }
  }, [productsError, postsError, usersError, ordersError, settingsError]);

  return {
    isApiAvailable,
    error: lastError
  };
};
