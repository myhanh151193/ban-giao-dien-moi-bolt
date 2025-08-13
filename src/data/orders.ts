// Fallback data when API is unavailable
// Data is normally fetched from: https://medisosoft.com/path/api/orders

export const orders = [
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
    status: 'completed' as const,
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
    status: 'pending' as const,
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
    status: 'processing' as const,
    createdAt: '2024-01-13 09:15',
    shippingAddress: '789 Đường DEF, Quận 7, TP.HCM',
    paymentMethod: 'cod',
    notes: 'Khách hàng VIP'
  }
];
