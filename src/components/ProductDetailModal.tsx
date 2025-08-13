import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // Mock additional images for demo
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Product Images */}
              <div className="lg:w-1/2 p-6">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                    <img
                      src={productImages[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Thumbnail Images */}
                  <div className="flex space-x-2">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImage === index
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2 p-6 overflow-y-auto max-h-[90vh]">
                <div className="space-y-6">
                  {/* Badge */}
                  {product.badge && (
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.badge === 'Bestseller' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : product.badge === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Category */}
                  <div>
                    <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                  {/* Rating */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                    <span className="text-gray-600">({product.reviews} đánh giá)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-2xl text-gray-500 line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-lg font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    {product.inStock ? (
                      <>
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-green-600 font-medium">Còn hàng</span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-red-500" />
                        <span className="text-red-600 font-medium">Hết hàng</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tính năng nổi bật</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantity Selector */}
                  {product.inStock && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Số lượng</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(-1)}
                            className="p-2 hover:bg-gray-50 transition-colors duration-200"
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(1)}
                            className="p-2 hover:bg-gray-50 transition-colors duration-200"
                            disabled={quantity >= 10}
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <span className="text-gray-600">Tối đa 10 sản phẩm</span>
                      </div>
                    </div>
                  )}

                  {/* Demo Button */}
                  {product.demoLink && (
                    <div>
                      <a
                        href={product.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 active:scale-95"
                      >
                        <span className="mr-2">🔗</span>
                        Xem Demo Trực Tiếp
                      </a>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                        product.inStock
                          ? addedToCart
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 active:scale-95'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Đã thêm vào giỏ</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5" />
                          <span>{product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        isWishlisted
                          ? 'border-red-500 bg-red-50 text-red-500'
                          : 'border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    <button className="p-4 rounded-xl border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500 transition-all duration-200">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Shipping & Return Info */}
                  <div className="border-t pt-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Miễn phí vận chuyển</p>
                        <p className="text-sm text-gray-600">Cho đơn hàng trên $500</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Đổi trả trong 30 ngày</p>
                        <p className="text-sm text-gray-600">Hoàn tiền 100% nếu không hài lòng</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Bảo hành chính hãng</p>
                        <p className="text-sm text-gray-600">12-24 tháng bảo hành toàn cầu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailModal;
