import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { OrderAdmin } from '../../types';
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  Calendar,
  Clock,
  Check,
  X,
  Package
} from 'lucide-react';

const Orders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderAdmin | null>(null);

  const orders = [
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
      status: 'completed',
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
      status: 'pending',
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
      status: 'processing',
      createdAt: '2024-01-13 09:15',
      shippingAddress: '789 Đường DEF, Quận 7, TP.HCM',
      paymentMethod: 'cod',
      notes: 'Khách hàng VIP'
    },
    {
      id: 'DH004',
      customer: {
        name: 'Phạm Thị D',
        email: 'phamthid@email.com',
        phone: '0741258963'
      },
      products: [
        { name: 'Restaurant & Cafe Template', quantity: 1, price: 1690000 }
      ],
      total: 1690000,
      status: 'cancelled',
      createdAt: '2024-01-12 14:20',
      shippingAddress: '321 Đư��ng GHI, Quận 5, TP.HCM',
      paymentMethod: 'cod',
      notes: 'Khách hàng hủy đơn'
    },
    {
      id: 'DH005',
      customer: {
        name: 'Hoàng Văn E',
        email: 'hoangvane@email.com',
        phone: '0852963741'
      },
      products: [
        { name: 'Agency Landing Page', quantity: 1, price: 2190000 }
      ],
      total: 2190000,
      status: 'completed',
      createdAt: '2024-01-11 11:00',
      shippingAddress: '654 Đường JKL, Quận 2, TP.HCM',
      paymentMethod: 'cod',
      notes: ''
    }
  ]; // Now using context instead

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoàn thành' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xử lý' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đang xử lý' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Đã hủy' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return config || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderAdmin['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      deleteOrder(orderId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="mt-2 text-gray-600">Theo dõi và quản lý tất cả đơn hàng</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download className="-ml-1 mr-2 h-5 w-5" />
            Xuất báo cáo
          </button>
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
                placeholder="Tìm kiếm đơn hàng..."
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

            {/* Date Filter */}
            <div className="relative">
              <button className="w-full inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Calendar className="h-4 w-4 mr-2" />
                Lọc theo ngày
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Danh sách đơn hàng ({filteredOrders.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
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
              {filteredOrders.map((order) => {
                const statusConfig = getStatusBadge(order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {order.createdAt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                        <div className="text-sm text-gray-500">{order.customer.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.products.map((product, index) => (
                          <div key={index} className="mb-1">
                            {product.name} x{product.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.total.toLocaleString('vi-VN')}₫
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
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900" 
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                            className="text-green-600 hover:text-green-900"
                            title="Xác nhận"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        {(order.status === 'pending' || order.status === 'processing') && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                            title="Hủy đơn"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Không có đơn hàng</h3>
            <p className="mt-1 text-sm text-gray-500">
              Không tìm thấy đơn hàng nào phù hợp với bộ lọc.
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
    </div>
  );
};

const OrderDetailModal: React.FC<{
  order: OrderAdmin | null,
  onClose: () => void,
  onUpdateStatus: (orderId: string, status: OrderAdmin['status']) => void
}> = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;
  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hoàn thành' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xử lý' },
    processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đang xử lý' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Đã hủy' },
  };
  const config = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Chi tiết đơn hàng #{order.id}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
              </span>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin khách hàng</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><strong>Tên:</strong> {order.customer.name}</p>
                  <p><strong>Email:</strong> {order.customer.email}</p>
                  <p><strong>Điện thoại:</strong> {order.customer.phone}</p>
                  <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Sản phẩm</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  {order.products.map((product: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Số lượng: {product.quantity}</p>
                      </div>
                      <p className="font-medium">{product.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Tổng cộng:</p>
                      <p className="font-semibold text-lg">{order.total.toLocaleString('vi-VN')}₫</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin đơn hàng</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><strong>Ngày đặt:</strong> {order.createdAt}</p>
                  <p><strong>Phương thức thanh toán:</strong> Thanh toán khi nhận hàng</p>
                  {order.notes && <p><strong>Ghi chú:</strong> {order.notes}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {order.status === 'pending' && (
              <button
                onClick={() => {
                  onUpdateStatus(order.id, 'processing');
                  onClose();
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Xác nhận đơn hàng
              </button>
            )}
            {order.status === 'processing' && (
              <button
                onClick={() => {
                  onUpdateStatus(order.id, 'completed');
                  onClose();
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Hoàn thành đơn hàng
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

export default Orders;
