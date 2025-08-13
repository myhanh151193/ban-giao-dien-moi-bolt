import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Gift, Zap, Bell } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Newsletter: React.FC = () => {
  const { settings } = useSettings();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  const benefits = [
    {
      icon: <Gift className="h-6 w-6 text-red-500" />,
      title: "Ưu đãi độc quyền",
      description: "Nhận voucher giảm giá lên đến 20% cho thành viên"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Tin tức sản phẩm",
      description: "Cập nhật sản phẩm mới nhất và công nghệ hot trend"
    },
    {
      icon: <Bell className="h-6 w-6 text-blue-500" />,
      title: "Thông báo flash sale",
      description: "Không bỏ lỡ các chương trình khuyến mãi hấp dẫn"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Đăng ký thành công! ���
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Cảm ơn bạn đã đăng ký nhận tin từ {settings.general.siteName}. Bạn sẽ nhận được email xác nhận sớm nhất.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                💌 Kiểm tra hộp thư để nhận voucher giảm giá 15% cho đơn hàng đầu tiên!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Content */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Đăng ký nhận tin
                  </h2>
                  <p className="text-gray-600">Nhận ưu đãi và tin tức mới nhất</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-8">
                Tham gia cộng đồng hơn <span className="font-bold text-blue-600">50,000</span> khách hàng
                đang nhận những ưu đãi độc quyền và cập nhật sản phẩm mới nhất từ {settings.general.siteName}.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Nhập địa chỉ email của bạn..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Đăng ký ngay
                    </div>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                Bằng cách đăng ký, bạn đồng ý với{' '}
                <a href="#" className="text-blue-600 hover:underline">Điều khoản dịch vụ</a>
                {' '}và{' '}
                <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a>
                {' '}của chúng tôi.
              </p>
            </div>

            {/* Right side - Visual */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Mail className="h-24 w-24 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center animate-bounce">
                    <Gift className="h-8 w-8" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Voucher 15% ngay lập tức!
                </h3>
                <p className="text-gray-600 mb-6">
                  Nhận ngay mã giảm giá 15% cho đơn hàng đầu tiên khi đăng ký newsletter
                </p>
                
                {/* Customer avatars */}
                <div className="flex justify-center space-x-2 mb-4">
                  {[
                    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
                    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
                    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
                    "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100"
                  ].map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt="Customer"
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center border-2 border-white shadow-lg">
                    +50K
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Tham gia cùng hơn 50,000 khách hàng khác
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
