import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useTestimonials } from '../context/TestimonialContext';

const Testimonials: React.FC = () => {
  const { settings } = useSettings();
  const { getActiveTestimonials } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get only active testimonials from admin
  const testimonials = getActiveTestimonials();


  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(nextTestimonial, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

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
            Hơn 100,000 khách hàng đã tin tưởng và hài lòng với dịch vụ của {settings.general.siteName}
          </p>
        </div>

        {/* Desktop View - 3 cards */}
        <div className="hidden lg:block">
          {testimonials.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có đánh giá nào được hiển thị.</p>
            </div>
          )}
        </div>

        {/* Mobile View - 1 card with navigation */}
        <div className="lg:hidden">
          {testimonials.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có đánh giá nào được hiển thị.</p>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        {testimonials.length > 0 && (
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
        )}

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
