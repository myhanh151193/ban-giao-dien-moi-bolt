import React from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Eye,
  Download,
  Star
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Dashboard: React.FC = () => {
  const { settings } = useSettings();
  const stats = [
    {
      name: 'Doanh thu tháng này',
      value: '245,000,000₫',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'Đơn hàng mới',
      value: '157',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      name: 'Sản phẩm đã bán',
      value: '89',
      change: '+15.3%',
      changeType: 'positive',
      icon: Package,
    },
    {
      name: 'Khách hàng mới',
      value: '234',
      change: '+6.1%',
      changeType: 'positive',
      icon: Users,
    },
  ];

  const recentOrders = [
    { id: 'DH001', customer: 'Nguyễn Văn A', product: 'E-commerce Pro Template', amount: '2,390,000₫', status: 'completed' },
    { id: 'DH002', customer: 'Trần Thị B', product: 'Corporate Business Template', amount: '1,890,000₫', status: 'pending' },
    { id: 'DH003', customer: 'Lê Minh C', product: 'Creative Portfolio Template', amount: '1,490,000₫', status: 'completed' },
    { id: 'DH004', customer: 'Phạm Thị D', product: 'Restaurant & Cafe Template', amount: '1,690,000₫', status: 'processing' },
    { id: 'DH005', customer: 'Hoàng Văn E', product: 'Agency Landing Page', amount: '2,190,000₫', status: 'completed' },
  ];

  const topProducts = [
    { name: 'E-commerce Pro Template', sales: 45, revenue: '107,550,000₫', rating: 4.8 },
    { name: 'Corporate Business Template', sales: 32, revenue: '60,480,000₫', rating: 4.9 },
    { name: 'Agency Landing Page', sales: 28, revenue: '61,320,000₫', rating: 4.7 },
    { name: 'Creative Portfolio Template', sales: 25, revenue: '37,250,000₫', rating: 4.7 },
    { name: 'Restaurant & Cafe Template', sales: 22, revenue: '37,180,000₫', rating: 4.6 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const statusText = {
      completed: 'Hoàn thành',
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      cancelled: 'Đã hủy',
    };
    return statusText[status as keyof typeof statusText] || status;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Tổng quan hoạt động kinh doanh của TemplateHub</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
                          <span className="sr-only">{stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by</span>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Đơn hàng gần đây</h3>
          </div>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <li key={order.id} className="py-4 px-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        #{order.id} - {order.customer}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{order.product}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-right">
            <a href="/admin/orders" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Xem tất cả đơn hàng
            </a>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sản phẩm bán chạy</h3>
          </div>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <li key={product.name} className="py-4 px-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">{product.sales} lượt bán</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-right">
            <a href="/admin/products" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Xem tất cả sản phẩm
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Thao tác nhanh</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Thêm sản phẩm mới</p>
                <p className="text-sm text-gray-500">Tạo template mới</p>
              </div>
            </button>

            <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Xem website</p>
                <p className="text-sm text-gray-500">Xem trang public</p>
              </div>
            </button>

            <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="flex-shrink-0">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Xuất báo cáo</p>
                <p className="text-sm text-gray-500">Tải báo cáo Excel</p>
              </div>
            </button>

            <button className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Quản lý user</p>
                <p className="text-sm text-gray-500">Xem khách hàng</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
