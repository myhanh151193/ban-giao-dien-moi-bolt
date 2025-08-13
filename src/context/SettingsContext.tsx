import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/apiService';

interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  language: string;
}

interface AppearanceSettings {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  headerStyle: string;
  footerStyle: string;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
}

interface PaymentSettings {
  enableCOD: boolean;
  enableBankTransfer: boolean;
  enableMomo: boolean;
  enableZaloPay: boolean;
  shippingFee: number;
  freeShippingThreshold: number;
}

interface NotificationSettings {
  emailOnNewOrder: boolean;
  emailOnStatusChange: boolean;
  emailOnLowStock: boolean;
  smsNotifications: boolean;
}

interface ContactSettings {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  googleMapUrl: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
  };
}

interface AboutSettings {
  companyName: string;
  foundedYear: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  teamSize: string;
  achievements: string[];
}

interface AppSettings {
  general: GeneralSettings;
  appearance: AppearanceSettings;
  email: EmailSettings;
  payments: PaymentSettings;
  notifications: NotificationSettings;
  contact: ContactSettings;
  about: AboutSettings;
}

interface SettingsContextType {
  settings: AppSettings;
  loading: boolean;
  error: string | null;
  updateSettings: (section: keyof AppSettings, field: string, value: any) => void;
  saveSettings: () => Promise<void>;
  resetSettings: () => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

const defaultSettings: AppSettings = {
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
  },
  contact: {
    address: '123 Phố Technology, Quận 1, TP.HCM',
    phone: '1900 9999',
    email: 'info@templatehub.com',
    workingHours: 'Thứ 2 - Chủ nhật: 8:00 - 22:00',
    googleMapUrl: '',
    socialMedia: {
      facebook: 'https://facebook.com/templatehub',
      twitter: 'https://twitter.com/templatehub',
      instagram: 'https://instagram.com/templatehub',
      youtube: 'https://youtube.com/templatehub'
    }
  },
  about: {
    companyName: 'TemplateHub',
    foundedYear: '2015',
    description: 'TemplateHub là nền tảng cung cấp mẫu website chuyên nghiệp hàng đầu tại Việt Nam. Chúng tôi cam kết mang đến những giải pháp thiết kế web chất lượng cao, hiện đại và phù hợp với mọi nhu cầu kinh doanh.',
    mission: 'Giúp các doanh nghiệp xây dựng sự hiện diện trực tuyến mạnh mẽ thông qua những mẫu thiết kế website chuyên nghiệp và dễ sử dụng.',
    vision: 'Trở thành nền tảng thiết kế website hàng đầu Đông Nam Á, nơi mọi doanh nghiệp có thể tìm thấy giải pháp phù hợp cho sự phát triển số.',
    values: ['Chất lượng', 'Sáng tạo', 'Tận tâm', 'Đổi mới'],
    teamSize: '50+',
    achievements: ['10,000+ khách hàng tin tưởng', '500+ mẫu thiết kế chất lượng', '99% tỷ lệ hài lòng khách hàng', '5 năm kinh nghiệm']
  }
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getSettings();
      const apiSettings = response.data || response;

      // Merge with default settings to ensure all fields exist
      const mergedSettings = {
        ...defaultSettings,
        ...apiSettings,
        contact: { ...defaultSettings.contact, ...apiSettings.contact },
        about: { ...defaultSettings.about, ...apiSettings.about }
      };

      setSettings(mergedSettings);
    } catch (error: any) {
      console.error('❌ Lỗi kết nối API cài đặt:', error);
      setError('Không thể tải dữ liệu cài đặt từ API');
      // Keep default settings as base structure but show error
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = (section: keyof AppSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const saveSettings = async () => {
    try {
      setError(null);
      await apiService.updateSettings(settings);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Không thể lưu cài đặt');
      throw error;
    }
  };

  const resetSettings = async () => {
    try {
      setError(null);
      await apiService.updateSettings(defaultSettings);
      setSettings(defaultSettings);
      console.log('Settings reset successfully');
    } catch (error) {
      console.error('Error resetting settings:', error);
      setError('Không thể khôi phục cài đặt');
      // Fallback to local reset if API fails
      setSettings(defaultSettings);
    }
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  const value: SettingsContextType = {
    settings,
    loading,
    error,
    updateSettings,
    saveSettings,
    resetSettings,
    refreshSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
