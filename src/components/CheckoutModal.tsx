import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Truck, Building2, Wallet, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    notes: ''
  });

  const subtotal = getTotalPrice();
  const shippingFee = subtotal > 500 ? 0 : 25;
  const discount = 0;
  const finalAmount = subtotal + shippingFee - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setOrderComplete(false);
    setIsProcessing(false);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      postalCode: '',
      paymentMethod: 'credit-card',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      cardName: '',
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'credit-card', name: 'Thẻ tín dụng/ghi nợ', icon: CreditCard, description: 'Visa, Mastercard, JCB' },
    { id: 'bank-transfer', name: 'Chuyển khoản ngân hàng', icon: Building2, description: 'Vietcombank, Techcombank, BIDV' },
    { id: 'momo', name: 'Ví MoMo', icon: Smartphone, description: 'Thanh toán qua ví điện tử MoMo' },
    { id: 'zalopay', name: 'ZaloPay', icon: Wallet, description: 'Thanh toán qua ví ZaloPay' },
    { id: 'cod', name: 'Thanh toán khi nhận hàng', icon: Truck, description: 'Trả tiền mặt khi giao hàng' }
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gray-50">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {orderComplete ? 'Đặt hàng thành công!' : 'Thanh toán đơn hàng'}
                </h2>
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {orderComplete ? (
              /* Order Success */
              <div className="p-8 text-center">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Cảm ơn bạn đã đặt hàng!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Đơn hàng của bạn đã được xác nhận và sẽ được xử lý trong thời gian sớm nhất.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Mã đơn hàng</p>
                    <p className="text-lg font-bold text-blue-600">#DH{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>
                <button
                  onClick={resetAndClose}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <div className="flex">
                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  
                  {/* Progress Steps */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        1
                      </div>
                      <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        2
                      </div>
                      <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        3
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Customer Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin khách hàng</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Họ *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Nhập họ của bạn"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tên *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Nhập tên của bạn"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="example@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Số điện thoại *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="0123 456 789"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Địa chỉ *
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Số nhà, tên đường"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Thành phố *
                            </label>
                            <select
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Chọn thành phố</option>
                              <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                              <option value="ha-noi">Hà Nội</option>
                              <option value="da-nang">Đà Nẵng</option>
                              <option value="can-tho">Cần Thơ</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quận/Huyện *
                            </label>
                            <input
                              type="text"
                              name="district"
                              value={formData.district}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Quận/Huyện"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mã bưu điện
                            </label>
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="700000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ghi chú đơn hàng
                          </label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                          Tiếp tục
                        </button>
                      </div>
                    )}

                    {/* Step 2: Payment Method */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                        
                        <div className="space-y-3">
                          {paymentMethods.map((method) => {
                            const IconComponent = method.icon;
                            return (
                              <label
                                key={method.id}
                                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                  formData.paymentMethod === method.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={method.id}
                                  checked={formData.paymentMethod === method.id}
                                  onChange={handleInputChange}
                                  className="sr-only"
                                />
                                <IconComponent className="h-6 w-6 text-gray-600 mr-4" />
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{method.name}</div>
                                  <div className="text-sm text-gray-500">{method.description}</div>
                                </div>
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                  formData.paymentMethod === method.id
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300'
                                }`}>
                                  {formData.paymentMethod === method.id && (
                                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
                          >
                            Quay lại
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                          >
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment Details */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Chi tiết thanh toán</h3>
                        
                        {formData.paymentMethod === 'credit-card' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên trên thẻ *
                              </label>
                              <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="NGUYEN VAN A"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số thẻ *
                              </label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Ngày hết hạn *
                                </label>
                                <input
                                  type="text"
                                  name="cardExpiry"
                                  value={formData.cardExpiry}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  CVC *
                                </label>
                                <input
                                  type="text"
                                  name="cardCvc"
                                  value={formData.cardCvc}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                  placeholder="123"
                                  maxLength={4}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {formData.paymentMethod === 'bank-transfer' && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Thông tin chuyển khoản</h4>
                            <div className="text-sm text-gray-700 space-y-1">
                              <p><strong>Ngân hàng:</strong> Vietcombank</p>
                              <p><strong>Số tài khoản:</strong> 1234567890</p>
                              <p><strong>Chủ tài khoản:</strong> CONG TY TECHSTORE</p>
                              <p><strong>Nội dung:</strong> DH{Date.now().toString().slice(-6)} {formData.firstName} {formData.lastName}</p>
                            </div>
                          </div>
                        )}

                        {(formData.paymentMethod === 'momo' || formData.paymentMethod === 'zalopay') && (
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <p className="text-gray-700 mb-2">
                              Bạn sẽ được chuyển đến ứng dụng {formData.paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'} để hoàn tất thanh toán
                            </p>
                          </div>
                        )}

                        {formData.paymentMethod === 'cod' && (
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                              Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng. Vui lòng chuẩn bị đủ tiền theo đúng số tiền đơn hàng.
                            </p>
                          </div>
                        )}

                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
                          >
                            Quay lại
                          </button>
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-80 bg-gray-50 p-6 border-l">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                  
                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                          <p className="text-gray-500 text-sm">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính:</span>
                      <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phí vận chuyển:</span>
                      <span>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá:</span>
                        <span>-{discount.toLocaleString('vi-VN')}₫</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                      <span>Tổng cộng:</span>
                      <span>{finalAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Thanh toán an toàn & bảo mật
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
