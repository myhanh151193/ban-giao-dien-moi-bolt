import React from 'react';
import { Users, Target, Award, Heart, Shield, Truck, Headphones, RotateCcw } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      position: "Giám đốc điều hành",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "10+ năm kinh nghiệm trong ngành công nghệ"
    },
    {
      name: "Trần Thị B",
      position: "Trưởng phòng Marketing",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Chuyên gia marketing số với 8 năm kinh nghiệm"
    },
    {
      name: "Lê Minh C",
      position: "Trưởng phòng Kỹ thuật",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Kỹ sư phần mềm với niềm đam mê công nghệ"
    },
    {
      name: "Phạm Thị D",
      position: "Trưởng phòng CSKH",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Chuyên gia chăm sóc khách hàng tận tâm"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Tận tâm",
      description: "Chúng tôi luôn đặt khách hàng lên hàng đầu và phục vụ với trái tim"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Chất lượng",
      description: "Cam kết cung cấp sản phẩm chính hãng với chất lượng cao nhất"
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "Đổi mới",
      description: "Không ngừng cập nhật và đưa ra những giải pháp công nghệ mới nhất"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Uy tín",
      description: "Xây dựng niềm tin thông qua dịch vụ chuyên nghiệp và minh bạch"
    }
  ];

  const features = [
    {
      icon: <Truck className="h-6 w-6 text-blue-600" />,
      title: "Giao hàng miễn phí",
      description: "Miễn phí giao hàng cho đơn hàng trên 500k"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Bảo hành chính hãng",
      description: "Bảo hành theo tiêu chuẩn nhà sản xuất"
    },
    {
      icon: <Headphones className="h-6 w-6 text-purple-600" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ"
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-orange-600" />,
      title: "Đổi trả dễ dàng",
      description: "Chính sách đổi trả trong 30 ngày"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Về TechStore
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Chúng tôi là cửa hàng công nghệ hàng đầu, mang đến những sản phẩm tốt nhất 
              với dịch vụ chuyên nghiệp và tận tâm.
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
                  TechStore được thành lập vào năm 2015 với mục tiêu đơn giản: mang đến những sản phẩm 
                  công nghệ tốt nhất cho người tiêu dùng Việt Nam với giá cả hợp lý và dịch vụ tuyệt vời.
                </p>
                <p>
                  Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành một trong những nhà bán lẻ công nghệ 
                  uy tín nhất với hơn 50 cửa hàng trên toàn quốc và website thương mại điện tử hiện đại.
                </p>
                <p>
                  Với đội ngũ hơn 200 nhân viên giàu kinh nghiệm và niềm đam mê công nghệ, chúng tôi cam kết 
                  mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="TechStore team"
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
              Những giá trị định hướng hoạt động và phát triển của TechStore
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những con người tài năng đứng sau thành công của TechStore
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn TechStore?</h2>
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
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cửa hàng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">Khách hàng hài lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Sản phẩm</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">9+</div>
              <div className="text-blue-100">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
