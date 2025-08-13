import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  Users as UsersIcon
} from 'lucide-react';

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
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

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' },
    { value: 'suspended', label: 'Tạm khóa' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoạt động' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Không hoạt động' },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', label: 'Tạm khóa' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return config || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Quản trị viên' },
      customer: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Khách hàng' },
    };
    const config = roleConfig[role as keyof typeof roleConfig];
    return config || { bg: 'bg-gray-100', text: 'text-gray-800', label: role };
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateUserStatus = (userId: number, newStatus: string) => {
    console.log(`Update user ${userId} to status: ${newStatus}`);
    // Here you would implement the status update logic
  };

  const deleteUser = (userId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      console.log('Delete user:', userId);
      // Here you would implement the delete logic
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="mt-2 text-gray-600">Quản lý tài khoản và thông tin khách hàng</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <UserPlus className="-ml-1 mr-2 h-5 w-5" />
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Tổng người dùng</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{users.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Hoạt động</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {users.filter(u => u.status === 'active').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBag className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Có đơn hàng</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {users.filter(u => u.totalOrders > 0).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Mới tháng này</dt>
                  <dd className="text-2xl font-semibold text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Filter */}
            <div className="relative">
              <button className="w-full inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc khác
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Danh sách người dùng ({filteredUsers.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const statusConfig = getStatusBadge(user.status);
                const roleConfig = getRoleBadge(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">Tham gia: {user.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center mb-1">
                        <Mail className="h-4 w-4 mr-1 text-gray-400" />
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleConfig.bg} ${roleConfig.text}`}>
                        {roleConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.totalOrders} đơn</div>
                      <div className="text-sm text-gray-500">
                        {user.totalSpent.toLocaleString('vi-VN')}₫
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-900" 
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Chỉnh sửa">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900" 
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Không có người dùng</h3>
            <p className="mt-1 text-sm text-gray-500">
              Không tìm thấy người dùng nào phù hợp với bộ lọc.
            </p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          onUpdateStatus={updateUserStatus}
        />
      )}
    </div>
  );
};

const UserDetailModal: React.FC<{ 
  user: any, 
  onClose: () => void,
  onUpdateStatus: (userId: number, status: string) => void 
}> = ({ user, onClose, onUpdateStatus }) => {
  const statusConfig = {
    active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoạt động' },
    inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Không hoạt động' },
    suspended: { bg: 'bg-red-100', text: 'text-red-800', label: 'Tạm khóa' },
  };
  const config = statusConfig[user.status as keyof typeof statusConfig];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Chi tiết người dùng
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
              </span>
            </div>

            <div className="space-y-6">
              {/* User Avatar & Basic Info */}
              <div className="flex items-center space-x-4">
                {user.avatar ? (
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-700">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              </div>

              {/* User Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin chi tiết</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><strong>Ngày tham gia:</strong> {user.joinDate}</p>
                  <p><strong>Lần đăng nhập cuối:</strong> {user.lastLogin}</p>
                  <p><strong>Địa chỉ:</strong> {user.address}</p>
                  <p><strong>Vai trò:</strong> {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</p>
                </div>
              </div>

              {/* Order Statistics */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Thống kê đơn hàng</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><strong>Tổng số đơn hàng:</strong> {user.totalOrders}</p>
                  <p><strong>Tổng chi tiêu:</strong> {user.totalSpent.toLocaleString('vi-VN')}₫</p>
                  <p><strong>Giá trị trung bình:</strong> {user.totalOrders > 0 ? (user.totalSpent / user.totalOrders).toLocaleString('vi-VN') : 0}₫</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {user.status === 'active' && (
              <button
                onClick={() => {
                  onUpdateStatus(user.id, 'suspended');
                  onClose();
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Tạm khóa
              </button>
            )}
            {user.status !== 'active' && (
              <button
                onClick={() => {
                  onUpdateStatus(user.id, 'active');
                  onClose();
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Kích hoạt
              </button>
            )}
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
