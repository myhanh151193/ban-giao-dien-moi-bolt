import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Testimonial } from '../types';

interface TestimonialContextType {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: number, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: number) => void;
  getTestimonialById: (id: number) => Testimonial | undefined;
  getActiveTestimonials: () => Testimonial[];
  refreshTestimonials: () => void;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

export const useTestimonials = () => {
  const context = useContext(TestimonialContext);
  if (!context) {
    throw new Error('useTestimonials must be used within a TestimonialProvider');
  }
  return context;
};

interface TestimonialProviderProps {
  children: ReactNode;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nguyễn Minh Tuấn",
    role: "CEO Startup công nghệ",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    content: "Template e-commerce của TemplateHub giúp startup của tôi tiết kiệm 6 tháng phát triển. Code sạch, tích hợp thanh toán đầy đủ, và responsive hoàn hảo. Đội ngũ hỗ trợ rất chuyên nghiệp.",
    product: "E-commerce Pro Template",
    date: "2024-01-15",
    isActive: true
  },
  {
    id: 2,
    name: "Trần Thị Lan",
    role: "Giám đốc Marketing Agency",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    content: "Landing page template rất ấn tượng, tỷ lệ chuyển đổi của khách hàng tăng 40% sau khi sử dụng. Thiết kế đẹp, tối ưu SEO tốt. Đã giới thiệu cho nhiều đối tác khác.",
    product: "Agency Landing Page",
    date: "2024-01-20",
    isActive: true
  },
  {
    id: 3,
    name: "Lê Đức Thọ",
    role: "Freelance Developer",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    content: "Mua template để làm dự án cho khách hàng. Code rất clean, dễ customize và có documentation chi tiết. Giá cả hợp lý, chất lượng vượt mong đợi. Sẽ tiếp tục ủng hộ!",
    product: "Corporate Business Template",
    date: "2024-01-25",
    isActive: true
  },
  {
    id: 4,
    name: "Phạm Thị Hương",
    role: "UX/UI Designer",
    avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    content: "Portfolio template hoàn hảo cho designer. Responsive tuyệt vời, animations mượt mà. Tôi đã tùy chỉnh và tạo được portfolio ấn tượng, nhận được nhiều project mới.",
    product: "Creative Portfolio Template",
    date: "2024-02-01",
    isActive: true
  },
  {
    id: 5,
    name: "Hoàng Văn Nam",
    role: "Chủ cửa hàng online",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    content: "Website bán hàng được làm từ template này rất chuyên nghiệp. Khách hàng tin tưởng hơn, doanh số tăng 3 lần so với website cũ. Tích hợp payment gateway rất tiện lợi.",
    product: "E-commerce Store Template",
    date: "2024-02-05",
    isActive: true
  },
  {
    id: 6,
    name: "Vũ Thị Mai",
    role: "Blogger/Content Creator",
    avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    content: "Blog template có giao diện đẹp, load nhanh và SEO-friendly. Traffic blog của tôi tăng 200% sau 3 tháng sử dụng. Hỗ trợ đa ngôn ngữ và tích hợp social media tốt.",
    product: "Blog & Magazine Template",
    date: "2024-02-10",
    isActive: true
  }
];

export const TestimonialProvider: React.FC<TestimonialProviderProps> = ({ children }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    // Try to load testimonials from localStorage
    const savedTestimonials = localStorage.getItem('admin-testimonials');
    if (savedTestimonials) {
      try {
        const parsed = JSON.parse(savedTestimonials);
        // Merge with initial testimonials, but prioritize saved testimonials
        const mergedTestimonials = [...parsed];
        // Add any initial testimonials that don't exist in saved testimonials
        initialTestimonials.forEach(initialTestimonial => {
          if (!parsed.find((testimonial: Testimonial) => testimonial.id === initialTestimonial.id)) {
            mergedTestimonials.push(initialTestimonial);
          }
        });
        return mergedTestimonials;
      } catch (error) {
        console.error('Error loading testimonials from localStorage:', error);
        return initialTestimonials;
      }
    }
    return initialTestimonials;
  });

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: Date.now(), // Use timestamp as ID
    };
    const updatedTestimonials = [newTestimonial, ...testimonials];
    setTestimonials(updatedTestimonials);
    // Save to localStorage
    try {
      localStorage.setItem('admin-testimonials', JSON.stringify(updatedTestimonials));
    } catch (error) {
      console.error('Error saving testimonials to localStorage:', error);
    }
  };

  const updateTestimonial = (id: number, testimonialData: Partial<Testimonial>) => {
    const updatedTestimonials = testimonials.map(testimonial => 
      testimonial.id === id ? { ...testimonial, ...testimonialData } : testimonial
    );
    setTestimonials(updatedTestimonials);
    // Save to localStorage
    try {
      localStorage.setItem('admin-testimonials', JSON.stringify(updatedTestimonials));
    } catch (error) {
      console.error('Error saving testimonials to localStorage:', error);
    }
  };

  const deleteTestimonial = (id: number) => {
    const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
    setTestimonials(updatedTestimonials);
    // Save to localStorage
    try {
      localStorage.setItem('admin-testimonials', JSON.stringify(updatedTestimonials));
    } catch (error) {
      console.error('Error saving testimonials to localStorage:', error);
    }
  };

  const getTestimonialById = (id: number) => {
    return testimonials.find(testimonial => testimonial.id === id);
  };

  const getActiveTestimonials = () => {
    return testimonials.filter(testimonial => testimonial.isActive);
  };

  const refreshTestimonials = () => {
    const savedTestimonials = localStorage.getItem('admin-testimonials');
    if (savedTestimonials) {
      try {
        const parsed = JSON.parse(savedTestimonials);
        setTestimonials(parsed);
      } catch (error) {
        console.error('Error refreshing testimonials:', error);
      }
    }
  };

  // Listen for storage changes to sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-testimonials' && e.newValue) {
        try {
          const newTestimonials = JSON.parse(e.newValue);
          setTestimonials(newTestimonials);
        } catch (error) {
          console.error('Error syncing testimonials from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value: TestimonialContextType = {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    getTestimonialById,
    getActiveTestimonials,
    refreshTestimonials
  };

  return (
    <TestimonialContext.Provider value={value}>
      {children}
    </TestimonialContext.Provider>
  );
};
