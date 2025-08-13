import React from 'react';
import {
  Download,
  Code,
  Headphones,
  RefreshCw,
  CreditCard,
  Smartphone,
  Award,
  Palette
} from 'lucide-react';

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: <Download className="h-8 w-8 text-blue-600" />,
      title: "Tải về ngay lập tức",
      description: "Tải về mẫu website ngay sau khi hoàn tất thanh toán",
      details: "• File zip hoàn chỉnh kèm hướng dẫn\n• Code sạch, chuẩn w3c\n• Hỗ trợ responsive tất cả thiết bị",
      color: "blue"
    },
    {
      icon: <Code className="h-8 w-8 text-green-600" />,
      title: "Code chất lượng cao",
      description: "Cam kết 100% code sạch, tối ưu và dễ tùy chỉnh",
      details: "• HTML5, CSS3, JavaScript hiện đại\n• Tối ưu SEO và tốc độ tải\n• Tương thích nhiều trình duyệt",
      color: "green"
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: "Hỗ trợ kỹ thuật",
      description: "Đội ngũ kỹ thuật chuyên nghiệp hỗ trợ cài đặt",
      details: "• Hotline: 1900 9999\n• Hướng dẫn chi tiết qua video\n• Email: support@templatehub.com",
      color: "purple"
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-orange-600" />,
      title: "Cập nhật miễn phí",
      description: "Miễn phí cập nhật và bảo trì trong 1 năm",
      details: "• Cập nhật bảo mật và tính năng\n• Sửa lỗi và tối ưu hiệu suất\n• Hỗ trợ migration phiên bản mới",
      color: "orange"
    }
  ];

  const additionalFeatures = [
    {
      icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
      title: "Thanh toán đa dạng",
      description: "Hỗ trợ nhiều hình thức thanh toán an toàn"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-teal-600" />,
      title: "Responsive Design",
      description: "Hiển thị hoàn hảo trên mọi thiết bị"
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      title: "Chất lượng đảm bảo",
      description: "Kiểm tra code và thiết kế kỹ lưỡng trước khi bán"
    },
    {
      icon: <Palette className="h-6 w-6 text-red-600" />,
      title: "100+ mẫu đẹp",
      description: "Bộ sưu tập mẫu website đa dạng ngành nghề"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        accent: 'bg-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        accent: 'bg-green-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        accent: 'bg-purple-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'text-orange-600',
        accent: 'bg-orange-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tại sao chọn TemplateHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp những mẫu website chất lượng cao với dịch vụ hỗ trợ chuyên nghiệp
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainFeatures.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <div
                key={index}
                className={`${colors.bg} ${colors.border} border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-3 ${colors.accent} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                
                <div className="text-left">
                  <div className="text-sm text-gray-500 whitespace-pre-line">
                    {feature.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Dịch vụ bổ sung
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Bắt đầu xây dựng website ngay hôm nay!
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Hơn 50,000 khách hàng đã tin tưởng lựa chọn TemplateHub
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Xem mẫu
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Demo trực tuyến
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Mẫu website</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-gray-600">Khách hàng</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-gray-600">Ngành nghề</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
            <div className="text-gray-600">Đánh giá</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
