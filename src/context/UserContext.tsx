import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { apiService } from '../services/apiService';

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  updateUserStatus: (id: number, status: User['status']) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  getUserById: (id: number) => User | undefined;
  refreshUsers: () => Promise<void>;
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

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUsers();
      setUsers(response.data || response);
    } catch (error: any) {
      console.warn('⚠️ API không khả dụng - chuyển sang dữ liệu offline');
      console.log('👥 Đang tải danh sách người dùng từ fallback...');

      // Import fallback data dynamically
      const { users: fallbackUsers } = await import('../data/users');
      setUsers(fallbackUsers);
      setError('API không khả dụng - sử dụng dữ liệu offline');

      console.log(`✅ Đã tải ${fallbackUsers.length} người dùng từ dữ liệu offline`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (userData: Omit<User, 'id'>) => {
    try {
      setError(null);
      const userToSend = {
        ...userData,
        joinDate: new Date().toLocaleDateString('vi-VN'),
        lastLogin: new Date().toLocaleString('vi-VN'),
        totalOrders: 0,
        totalSpent: 0,
      };
      
      const response = await apiService.createUser?.(userToSend) || { data: { ...userToSend, id: Date.now() } };
      const newUser = response.data || response;
      setUsers(prev => [newUser, ...prev]);
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Không thể thêm người dùng');
      throw error;
    }
  };

  const updateUser = async (id: number, userData: Partial<User>) => {
    try {
      setError(null);
      const response = await apiService.updateUser?.(id.toString(), userData) || { data: userData };
      const updatedUser = response.data || response;
      setUsers(prev => 
        prev.map(user => 
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Không thể cập nhật người dùng');
      throw error;
    }
  };

  const updateUserStatus = async (id: number, status: User['status']) => {
    await updateUser(id, { status });
  };

  const deleteUser = async (id: number) => {
    try {
      setError(null);
      await apiService.deleteUser?.(id.toString());
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Không thể xóa người dùng');
      throw error;
    }
  };

  const getUserById = (id: number) => {
    return users.find(user => user.id === id);
  };

  const refreshUsers = async () => {
    await fetchUsers();
  };

  const value: UserContextType = {
    users,
    loading,
    error,
    addUser,
    updateUser,
    updateUserStatus,
    deleteUser,
    getUserById,
    refreshUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
