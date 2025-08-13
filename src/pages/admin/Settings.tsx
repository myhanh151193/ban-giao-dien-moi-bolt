import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import {
  Save,
  Upload,
  Globe,
  Mail,
  Shield,
  Palette,
  Bell,
  Database,
  Key,
  Monitor,
  Phone,
  Users
} from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, updateSettings, saveSettings } = useSettings();
  const [activeTab, setActiveTab] = useState('general');

  // Remove local state management as it's now handled by context
  /*const [settings, setSettings] = useState({
    general: {
      siteName: 'TemplateHub',
      siteDescription: 'Nền tảng cung cấp mẫu website chuyên nghiệp hàng đầu',
      siteUrl: 'https://templatehub.com',
      adminEmail: 'admin@templatehub.com',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi'
    },
    appearance: {
      logo: '',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      headerStyle: 'default',
      footerStyle: 'default'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: 'noreply@templatehub.com',
      fromName: 'TemplateHub'
    },
    payments: {
      enableCOD: true,
      enableBankTransfer: false,
      enableMomo: false,
      enableZaloPay: false,
      shippingFee: 50000,
      freeShippingThreshold: 1000000
    },
    notifications: {
      emailOnNewOrder: true,
      emailOnStatusChange: true,
      emailOnLowStock: false,
      smsNotifications: false
    }
  });*/

  const tabs = [
    { id: 'general', name: 'Tổng quan', icon: Globe },
    { id: 'appearance', name: 'Giao diện', icon: Palette },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'payments', name: 'Thanh toán', icon: Shield },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
    { id: 'contact', name: 'Liên hệ', icon: Phone },
    { id: 'about', name: 'Về chúng tôi', icon: Users },
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    updateSettings(section as any, field, value);
  };

  const handleSave = () => {
    saveSettings();
    alert('Cài đặt đã được lưu thành công! Thay đổi sẽ được áp dụng ngay lập tức trên website.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <p className="mt-2 text-gray-600">Quản lý cấu hình và tùy chỉnh website</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="-ml-1 mr-2 h-5 w-5" />
            Lưu tất cả
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 bg-gray-50 border-r border-gray-200">
            <nav className="space-y-1 p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Cài đặt tổng quan
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tên website
                      </label>
                      <input
                        type="text"
                        value={settings.general.siteName}
                        onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        URL website
                      </label>
                      <input
                        type="url"
                        value={settings.general.siteUrl}
                        onChange={(e) => handleInputChange('general', 'siteUrl', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Mô tả website
                      </label>
                      <textarea
                        rows={3}
                        value={settings.general.siteDescription}
                        onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email quản trị
                      </label>
                      <input
                        type="email"
                        value={settings.general.adminEmail}
                        onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Múi giờ
                      </label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Asia/Ho_Chi_Minh">Vi���t Nam (GMT+7)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Cài đặt giao diện
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo website
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                        </div>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <Upload className="h-4 w-4 mr-2" />
                          Tải lên logo
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Màu chủ đạo
                        </label>
                        <div className="mt-1 flex items-center space-x-3">
                          <input
                            type="color"
                            value={settings.appearance.primaryColor}
                            onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                            className="h-10 w-16 border border-gray-300 rounded-md"
                          />
                          <input
                            type="text"
                            value={settings.appearance.primaryColor}
                            onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Màu phụ
                        </label>
                        <div className="mt-1 flex items-center space-x-3">
                          <input
                            type="color"
                            value={settings.appearance.secondaryColor}
                            onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                            className="h-10 w-16 border border-gray-300 rounded-md"
                          />
                          <input
                            type="text"
                            value={settings.appearance.secondaryColor}
                            onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Cài đặt email
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpHost}
                        onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SMTP Port
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpPort}
                        onChange={(e) => handleInputChange('email', 'smtpPort', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email gửi đi
                      </label>
                      <input
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tên người gửi
                      </label>
                      <input
                        type="text"
                        value={settings.email.fromName}
                        onChange={(e) => handleInputChange('email', 'fromName', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Cài đặt thanh toán
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Phương thức thanh toán</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.payments.enableCOD}
                            onChange={(e) => handleInputChange('payments', 'enableCOD', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Thanh toán khi nhận hàng (COD)</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.payments.enableBankTransfer}
                            onChange={(e) => handleInputChange('payments', 'enableBankTransfer', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Chuyển khoản ngân hàng</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.payments.enableMomo}
                            onChange={(e) => handleInputChange('payments', 'enableMomo', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm text-gray-700">Ví điện tử MoMo</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phí vận chuyển (VND)
                        </label>
                        <input
                          type="number"
                          value={settings.payments.shippingFee}
                          onChange={(e) => handleInputChange('payments', 'shippingFee', parseInt(e.target.value))}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Miễn phí vận chuyển từ (VND)
                        </label>
                        <input
                          type="number"
                          value={settings.payments.freeShippingThreshold}
                          onChange={(e) => handleInputChange('payments', 'freeShippingThreshold', parseInt(e.target.value))}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Cài đặt thông báo
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Email khi có đơn hàng mới</span>
                        <p className="text-sm text-gray-500">Nhận email thông báo khi có đơn hàng mới</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailOnNewOrder}
                        onChange={(e) => handleInputChange('notifications', 'emailOnNewOrder', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Email khi thay đổi trạng thái</span>
                        <p className="text-sm text-gray-500">Nhận email khi trạng thái đơn hàng thay đổi</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailOnStatusChange}
                        onChange={(e) => handleInputChange('notifications', 'emailOnStatusChange', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Thông báo SMS</span>
                        <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn SMS</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.smsNotifications}
                        onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Cài đặt liên hệ
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Địa chỉ
                        </label>
                        <textarea
                          rows={3}
                          value={settings.contact.address}
                          onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Địa chỉ công ty"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          value={settings.contact.phone}
                          onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="1900 9999"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email liên hệ
                        </label>
                        <input
                          type="email"
                          value={settings.contact.email}
                          onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="info@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Giờ làm việc
                        </label>
                        <input
                          type="text"
                          value={settings.contact.workingHours}
                          onChange={(e) => handleInputChange('contact', 'workingHours', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Thứ 2 - Chủ nhật: 8:00 - 22:00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Google Maps URL
                      </label>
                      <input
                        type="url"
                        value={settings.contact.googleMapUrl}
                        onChange={(e) => handleInputChange('contact', 'googleMapUrl', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://maps.google.com/..."
                      />
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Mạng xã hội</h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Facebook
                          </label>
                          <input
                            type="url"
                            value={settings.contact.socialMedia.facebook}
                            onChange={(e) => {
                              const newSocialMedia = { ...settings.contact.socialMedia, facebook: e.target.value };
                              handleInputChange('contact', 'socialMedia', newSocialMedia);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Twitter
                          </label>
                          <input
                            type="url"
                            value={settings.contact.socialMedia.twitter}
                            onChange={(e) => {
                              const newSocialMedia = { ...settings.contact.socialMedia, twitter: e.target.value };
                              handleInputChange('contact', 'socialMedia', newSocialMedia);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://twitter.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Instagram
                          </label>
                          <input
                            type="url"
                            value={settings.contact.socialMedia.instagram}
                            onChange={(e) => {
                              const newSocialMedia = { ...settings.contact.socialMedia, instagram: e.target.value };
                              handleInputChange('contact', 'socialMedia', newSocialMedia);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://instagram.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            YouTube
                          </label>
                          <input
                            type="url"
                            value={settings.contact.socialMedia.youtube}
                            onChange={(e) => {
                              const newSocialMedia = { ...settings.contact.socialMedia, youtube: e.target.value };
                              handleInputChange('contact', 'socialMedia', newSocialMedia);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://youtube.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Us Settings */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Cài đặt về chúng tôi
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tên công ty
                        </label>
                        <input
                          type="text"
                          value={settings.about.companyName}
                          onChange={(e) => handleInputChange('about', 'companyName', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Năm thành lập
                        </label>
                        <input
                          type="text"
                          value={settings.about.foundedYear}
                          onChange={(e) => handleInputChange('about', 'foundedYear', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="2015"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Số lượng nhân viên
                        </label>
                        <input
                          type="text"
                          value={settings.about.teamSize}
                          onChange={(e) => handleInputChange('about', 'teamSize', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="50+"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mô tả công ty
                      </label>
                      <textarea
                        rows={4}
                        value={settings.about.description}
                        onChange={(e) => handleInputChange('about', 'description', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Giới thiệu tổng quát về công ty..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sứ mệnh
                      </label>
                      <textarea
                        rows={3}
                        value={settings.about.mission}
                        onChange={(e) => handleInputChange('about', 'mission', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Sứ mệnh của công ty..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tầm nhìn
                      </label>
                      <textarea
                        rows={3}
                        value={settings.about.vision}
                        onChange={(e) => handleInputChange('about', 'vision', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tầm nhìn tương lai của công ty..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giá trị cốt lõi
                      </label>
                      <p className="text-sm text-gray-500 mb-3">Nhập mỗi giá trị trên một dòng riêng biệt</p>
                      <textarea
                        rows={4}
                        value={settings.about.values.join('\n')}
                        onChange={(e) => {
                          const values = e.target.value.split('\n').filter(v => v.trim());
                          handleInputChange('about', 'values', values);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Chất lượng\nSáng tạo\nTận tâm\nĐổi mới"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thành tích nổi bật
                      </label>
                      <p className="text-sm text-gray-500 mb-3">Nhập mỗi thành tích trên một dòng riêng biệt</p>
                      <textarea
                        rows={4}
                        value={settings.about.achievements.join('\n')}
                        onChange={(e) => {
                          const achievements = e.target.value.split('\n').filter(a => a.trim());
                          handleInputChange('about', 'achievements', achievements);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10,000+ khách hàng tin tưởng\n500+ mẫu thiết kế chất lượng\n99% tỷ lệ hài lòng khách hàng\n5 năm kinh nghiệm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
