import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { apiService } from '../services/apiService';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProductById: (id: number) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getProducts();
      setProducts(response.data || response);
    } catch (error: any) {
      console.warn('⚠️ API không khả dụng - chuyển sang dữ liệu offline');
      console.log('📁 Đang tải dữ liệu sản phẩm từ fallback...');

      // Import fallback data dynamically
      const { products: fallbackProducts } = await import('../data/products');
      setProducts(fallbackProducts);
      setError('API không khả dụng - sử dụng dữ liệu offline');

      console.log(`✅ Đã tải ${fallbackProducts.length} sản phẩm từ dữ liệu offline`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổ��ơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      setError(null);
      const productToSend = {
        ...productData,
        slug: productData.slug || generateSlug(productData.name),
        seoTitle: productData.seoTitle || productData.name,
        seoDescription: productData.seoDescription || productData.description.substring(0, 160),
        altText: productData.altText || productData.name,
      };
      
      const response = await apiService.createProduct(productToSend);
      const newProduct = response.data || response;
      setProducts(prev => [...prev, newProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Không thể thêm sản phẩm');
      throw error;
    }
  };

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      setError(null);
      const response = await apiService.updateProduct(id.toString(), productData);
      const updatedProduct = response.data || response;
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Không thể cập nhật sản phẩm');
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      setError(null);
      await apiService.deleteProduct(id.toString());
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Không thể xóa sản phẩm');
      throw error;
    }
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const value: ProductContextType = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
