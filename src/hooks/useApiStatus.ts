import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { usePosts } from '../context/PostContext';
import { useUsers } from '../context/UserContext';
import { useOrders } from '../context/OrderContext';
import { useSettings } from '../context/SettingsContext';

export const useApiStatus = () => {
  const [isApiAvailable, setIsApiAvailable] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);

  // Safely get context values with try-catch to handle uninitialized contexts
  let productsError: string | null = null;
  let postsError: string | null = null;
  let usersError: string | null = null;
  let ordersError: string | null = null;
  let settingsError: string | null = null;

  try {
    ({ error: productsError } = useProducts());
  } catch (e) {
    // Context not yet available
  }

  try {
    ({ error: postsError } = usePosts());
  } catch (e) {
    // Context not yet available
  }

  try {
    ({ error: usersError } = useUsers());
  } catch (e) {
    // Context not yet available
  }

  try {
    ({ error: ordersError } = useOrders());
  } catch (e) {
    // Context not yet available
  }

  try {
    ({ error: settingsError } = useSettings());
  } catch (e) {
    // Context not yet available
  }

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
