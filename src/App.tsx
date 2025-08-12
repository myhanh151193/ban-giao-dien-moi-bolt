import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import BlogSection from './components/BlogSection';
import CheckoutModal from './components/CheckoutModal';
import ProductDetailModal from './components/ProductDetailModal';
import BlogDetailModal from './components/BlogDetailModal';
import { products } from './data/products';
import { Product, BlogPost } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isBlogDetailOpen, setIsBlogDetailOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleCheckoutOpen = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleProductDetailClose = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  const handleBlogClick = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setIsBlogDetailOpen(true);
  };

  const handleBlogDetailClose = () => {
    setIsBlogDetailOpen(false);
    setSelectedBlogPost(null);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header 
          onCartClick={handleCartClick}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <main>
          <Hero />
          <ProductGrid 
            products={products}
            selectedCategory={selectedCategory}
            onProductClick={handleProductClick}
          />
          <BlogSection />
          <BlogSection onBlogClick={handleBlogClick} />
        </main>

        <Footer />

        <CartSidebar 
          isOpen={isCartOpen}
          onClose={handleCartClose}
          onCheckout={handleCheckoutOpen}
        />

        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={handleCheckoutClose}
        />

        <ProductDetailModal
          product={selectedProduct}
          isOpen={isProductDetailOpen}
          onClose={handleProductDetailClose}
        />

        <BlogDetailModal
          post={selectedBlogPost}
          isOpen={isBlogDetailOpen}
          onClose={handleBlogDetailClose}
        />
      </div>
    </CartProvider>
  );
}

export default App;