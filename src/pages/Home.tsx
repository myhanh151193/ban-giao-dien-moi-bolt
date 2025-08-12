import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import BlogSection from '../components/BlogSection';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Features from '../components/Features';
import ProductDetailModal from '../components/ProductDetailModal';
import BlogDetailModal from '../components/BlogDetailModal';
import { products } from '../data/products';
import { Product, BlogPost } from '../types';

interface HomeProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Home: React.FC<HomeProps> = ({ selectedCategory, onCategoryChange }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isBlogDetailOpen, setIsBlogDetailOpen] = useState(false);

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
    <>
      <Hero />
      <Features />
      <ProductGrid 
        products={products}
        selectedCategory={selectedCategory}
        onProductClick={handleProductClick}
      />
      <Testimonials />
      <BlogSection onBlogClick={handleBlogClick} />
      <Newsletter />

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
    </>
  );
};

export default Home;
