export const API_CONFIG = {
  BASE_URL: 'https://medisosoft.com/path/api',
  ENDPOINTS: {
    AUTH: '/auth',
    PRODUCTS: '/products',
    CATEGORIES: '/categories',
    USERS: '/users',
    CART: '/cart',
    ORDERS: '/orders',
    BLOG: '/blog'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
