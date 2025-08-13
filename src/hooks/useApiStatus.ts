import { useState } from 'react';

export const useApiStatus = () => {
  // Simple static status for now - we know API is down
  const [isApiAvailable] = useState(false);
  const [error] = useState('API không khả dụng - sử dụng dữ liệu offline');

  return {
    isApiAvailable,
    error
  };
};
