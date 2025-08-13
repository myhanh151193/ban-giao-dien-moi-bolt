import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  updateUserStatus: (id: number, status: User['status']) => void;
  deleteUser: (id: number) => void;
  getUserById: (id: number) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    role: 'customer',
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
    status: 'active',
    role: 'customer',
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
    status: 'inactive',
    role: 'customer',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-18 09:15',
    totalOrders: 8,
    totalSpent: 19850000,
    address: '789 Đường DEF, Quận 7, TP.HCM'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0741258963',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    role: 'admin',
    joinDate: '2023-12-01',
    lastLogin: '2024-01-20 14:20',
    totalOrders: 0,
    totalSpent: 0,
    address: '321 Đường GHI, Quận 5, TP.HCM'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    phone: '0852963741',
    avatar: null,
    status: 'suspended',
    role: 'customer',
    joinDate: '2024-01-01',
    lastLogin: '2024-01-17 11:00',
    totalOrders: 2,
    totalSpent: 4380000,
    address: '654 Đường JKL, Quận 2, TP.HCM'
  }
];

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const updateUser = (id: number, userData: Partial<User>) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      )
    );
  };

  const updateUserStatus = (id: number, status: User['status']) => {
    updateUser(id, { status });
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getUserById = (id: number) => {
    return users.find(user => user.id === id);
  };

  const value: UserContextType = {
    users,
    addUser,
    updateUser,
    updateUserStatus,
    deleteUser,
    getUserById
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
