import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock, CreditCard } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Footer: React.FC = () => {
  const { settings } = useSettings();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold" style={{ color: settings.appearance.primaryColor }}>{settings.general.siteName}</h3>
            <p className="text-gray-300 leading-relaxed">
              {settings.general.siteDescription}
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-gray-400 transition-colors duration-200 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                onMouseEnter={(e) => e.currentTarget.style.color = settings.appearance.primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-200 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                onMouseEnter={(e) => e.currentTarget.style.color = settings.appearance.primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-200 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                onMouseEnter={(e) => e.currentTarget.style.color = settings.appearance.primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-200 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                onMouseEnter={(e) => e.currentTarget.style.color = settings.appearance.primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Payment methods */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Phương thức thanh toán</h5>
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">VISA</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">MASTERCARD</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">ATM</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">MOMO</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">VNPAY</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Danh mục</h4>
            <ul className="space-y-2">
              {['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Wearables', 'Phụ kiện'].map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2">
              {['Hướng dẫn mua hàng', 'Chính sách bảo hành', 'Chính sách đổi trả', 'Phương thức thanh toán', 'Vận chuyển', 'FAQ'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Thông tin liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: settings.appearance.primaryColor }} />
                <div>
                  <span className="text-gray-300">123 Phố Technology, Quận 1, TP.HCM</span>
                  <br />
                  <span className="text-gray-400 text-sm">Trụ sở chính</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" style={{ color: settings.appearance.primaryColor }} />
                <div>
                  <span className="text-gray-300">Hotline: 1900 9999</span>
                  <br />
                  <span className="text-gray-400 text-sm">+84 123 456 789</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" style={{ color: settings.appearance.primaryColor }} />
                <div>
                  <span className="text-gray-300">{settings.general.adminEmail}</span>
                  <br />
                  <span className="text-gray-400 text-sm">{settings.email.fromEmail}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 flex-shrink-0" style={{ color: settings.appearance.primaryColor }} />
                <div>
                  <span className="text-gray-300">8:00 - 22:00</span>
                  <br />
                  <span className="text-gray-400 text-sm">Tất cả các ngày trong tuần</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Đăng ký nhận tin khuyến mãi</h4>
              <p className="text-gray-400 mb-4">Nhận ưu đãi độc quyền và tin tức mới nhất từ {settings.general.siteName}</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                <button
                  className="text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                  style={{ backgroundColor: settings.appearance.primaryColor }}
                  onMouseEnter={(e) => {
                    const hoverColor = settings.appearance.primaryColor + 'dd';
                    e.currentTarget.style.backgroundColor = hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = settings.appearance.primaryColor;
                  }}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <p className="text-gray-400">
                © 2024 {settings.general.siteName}. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex items-center space-x-1 text-gray-400">
                <span>MST: 0123456789 |</span>
                <span>Ngày cấp: 01/01/2015</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Điều khoản dịch vụ
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Chính sách đổi trả
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
