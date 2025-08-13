import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Settings from './pages/admin/Settings';
import { BlogPost } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header
            onCartClick={handleCartClick}
          />

          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                }
              />
              <Route path="/templates" element={<Templates />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
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
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
