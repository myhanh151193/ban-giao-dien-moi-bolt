export const API_CONFIG = {
  BASE_URL: 'https://medisosoft.com/path/api/controllers',
  ENDPOINTS: {
    AUTH: '/AuthController.php',
    PRODUCTS: '/ProductController.php',
    CATEGORIES: '/CategoryController.php',
    USERS: '/UserController.php',
    CART: '/CartController.php',
    ORDERS: '/OrderController.php',
    BLOG: '/BlogController.php'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
