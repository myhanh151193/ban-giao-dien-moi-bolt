import React from 'react';
import { Users, Target, Award, Heart, Code, Download, Headphones, RefreshCw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const About: React.FC = () => {
  const { settings } = useSettings();
  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      position: "Giám đốc sáng tạo",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "12+ năm kinh nghiệm trong thiết kế web và UX/UI"
    },
    {
      name: "Trần Thị B",
      position: "Trưởng phòng Thiết kế",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Designer giàu kinh nghi���m với hơn 100 dự án thành công"
    },
    {
      name: "Lê Minh C",
      position: "Lead Developer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Fullstack developer chuyên frontend và React/Vue"
    },
    {
      name: "Phạm Thị D",
      position: "Trưởng phòng Hỗ trợ",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Chuyên gia hỗ trợ kỹ thuật và tư vấn khách hàng"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Sáng tạo",
      description: "Luôn tạo ra những thiết kế độc đáo và thu hút người dùng"
    },
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Chất lượng code",
      description: "Cam kết code sạch, tối ưu và tuân thủ chuẩn quốc tế"
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "Đổi mới",
      description: "Cập nhật xu hướng thiết kế và công nghệ mới nhất"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Uy tín",
      description: "Hơn 50,000 khách hàng tin tưởng và hài lòng"
    }
  ];

  const features = [
    {
      icon: <Download className="h-6 w-6 text-blue-600" />,
      title: "Tải về ngay",
      description: "Download mẫu website ngay sau khi thanh toán"
    },
    {
      icon: <Code className="h-6 w-6 text-green-600" />,
      title: "Code chuẩn",
      description: "HTML5, CSS3, JavaScript hiện đại và tối ưu"
    },
    {
      icon: <Headphones className="h-6 w-6 text-purple-600" />,
      title: "Hỗ trợ kỹ thuật",
      description: "Đội ngũ dev luôn sẵn sàng hỗ trợ"
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-orange-600" />,
      title: "Cập nhật miễn phí",
      description: "Cập nhật và sửa lỗi trong 1 năm"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Về {settings.about.companyName}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {settings.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {settings.about.companyName} được thành lập vào năm {settings.about.foundedYear} với tầm nhìn:
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
                  <p className="font-medium text-blue-800">
                    "{settings.about.vision}"
                  </p>
                </div>
                <p>
                  <strong>Sứ mệnh của chúng tôi:</strong> {settings.about.mission}
                </p>
                <p>
                  Với đội ngũ {settings.about.teamSize} nhân viên tài năng, chúng tôi cam kết mang đến những sản phẩm
                  chất lượng cao, hiện đại và dễ sử dụng.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={`${settings.about.companyName} team`}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng hoạt động và phát triển của {settings.about.companyName}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {settings.about.values.map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                    {values[index]?.icon || <Award className="h-8 w-8 text-blue-500" />}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn {settings.about.companyName}?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những ưu điểm vượt trội khiến khách hàng tin tưởng lựa chọn
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {settings.about.achievements.map((achievement, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">
                  {achievement.match(/\d+[+]?/) ? achievement.match(/\d+[+]?/)[0] : '✓'}
                </div>
                <div className="text-blue-100">
                  {achievement.replace(/\d+[+]?\s*/, '')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
