import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/about', label: 'Về chúng tôi' },
    { path: '/contact', label: 'Liên hệ' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                TechStore
              </Link>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {/* Main Navigation */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            </div>
          </nav>


          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
              {/* Main Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath(link.path)
                      ? 'text-blue-600 bg-blue-100'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
