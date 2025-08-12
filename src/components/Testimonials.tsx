import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Minh Tuấn",
      role: "Kỹ sư phần mềm",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "TechStore có dịch vụ tuyệt vời và sản phẩm chất lượng. Tôi đã mua iPhone 15 Pro Max tại đây và rất hài lòng với chất lượng sản phẩm cũng như sự tư vấn nhiệt tình của nhân viên.",
      product: "iPhone 15 Pro Max",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Trần Thị Lan",
      role: "Giám đốc Marketing",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "Mua MacBook Pro 14\" cho công việc, sản phẩm chính hãng, giá cả hợp lý. Đặc biệt là chế độ bảo hành và hỗ trợ sau bán hàng rất tốt. Nhân viên tư vấn chuyên nghiệp và am hiểu sản phẩm.",
      product: "MacBook Pro 14\"",
      date: "2024-01-20"
    },
    {
      id: 3,
      name: "Lê Đức Thọ",
      role: "Sinh viên IT",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4,
      content: "Shop uy tín, giao hàng nhanh. AirPods Pro mình mua có chất lượng âm thanh tuyệt vời. Giá cả cạnh tranh so với thị trường. Sẽ tiếp tục ủng hộ TechStore trong tương lai.",
      product: "AirPods Pro (3rd Gen)",
      date: "2024-01-25"
    },
    {
      id: 4,
      name: "Phạm Thị Hương",
      role: "Nhà thiết kế",
      avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "iPad Air 11\" phù hợp hoàn hảo cho công việc thiết kế của tôi. Màn hình đẹp, hiệu suất mạnh mẽ. TechStore có nhiều ưu đãi hấp dẫn và chính sách đổi trả linh hoạt.",
      product: "iPad Air 11\"",
      date: "2024-02-01"
    },
    {
      id: 5,
      name: "Hoàng Văn Nam",
      role: "Photographer",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      content: "Samsung Galaxy S24 Ultra có camera tuyệt vời cho công việc chụp ảnh của tôi. Nhân viên TechStore rất nhiệt tình hướng dẫn sử dụng và cài đặt. Dịch vụ 5 sao!",
      product: "Galaxy S24 Ultra",
      date: "2024-02-05"
    },
    {
      id: 6,
      name: "Vũ Thị Mai",
      role: "Bác sĩ",
      avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4,
      content: "Apple Watch Series 9 giúp tôi theo dõi sức khỏe rất tốt. Tính năng đa dạng, pin bền. TechStore có chương trình trả góp 0% lãi suất rất tiện lợi cho khách hàng.",
      product: "Apple Watch Series 9",
      date: "2024-02-10"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hơn 100,000 khách hàng đã tin tưởng và hài lòng với dịch vụ của TechStore
          </p>
        </div>

        {/* Desktop View - 3 cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 ${
                  index === 1 ? 'scale-105 border-2 border-blue-500' : 'hover:scale-105'
                }`}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-500 opacity-20" />
                  <p className="text-gray-700 leading-relaxed mb-4 relative z-10">
                    {testimonial.content}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-blue-600 font-medium">{testimonial.product}</p>
                  <p className="text-sm text-gray-500">{new Date(testimonial.date).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - 1 card with navigation */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg p-8 mx-4">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
                  <div className="flex mt-1">{renderStars(testimonials[currentIndex].rating)}</div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-500 opacity-20" />
                <p className="text-gray-700 leading-relaxed mb-4 relative z-10">
                  {testimonials[currentIndex].content}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-blue-600 font-medium">{testimonials[currentIndex].product}</p>
                <p className="text-sm text-gray-500">
                  {new Date(testimonials[currentIndex].date).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="hidden lg:flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="hidden lg:flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Đánh giá trung bình</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
            <div className="text-gray-600">Khách hàng hài lòng</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
            <div className="text-gray-600">Tỷ lệ giới thiệu</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
