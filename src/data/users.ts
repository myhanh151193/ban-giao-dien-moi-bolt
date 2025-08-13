// Fallback data when API is unavailable
// Data is normally fetched from: https://medisosoft.com/path/api/controllers/UserController.php

export const users = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active' as const,
    role: 'customer' as const,
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20 10:30',
    totalOrders: 5,
    totalSpent: 12450000,
    address: '123 Đường ABC, Quận 1, TP.HCM'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0987654321',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active' as const,
    role: 'customer' as const,
    joinDate: '2024-01-10',
    lastLogin: '2024-01-19 15:45',
    totalOrders: 3,
    totalSpent: 7580000,
    address: '456 Đường XYZ, Quận 3, TP.HCM'
  },
  {
    id: 3,
    name: 'Lê Minh C',
    email: 'leminhc@email.com',
    phone: '0369852147',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'inactive' as const,
    role: 'customer' as const,
    joinDate: '2024-01-05',
    lastLogin: '2024-01-18 09:15',
    totalOrders: 8,
    totalSpent: 19850000,
    address: '789 Đường DEF, Quận 7, TP.HCM'
  }
];
