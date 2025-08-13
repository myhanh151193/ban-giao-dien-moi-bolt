import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { PostProvider } from './context/PostContext';
import { UserProvider } from './context/UserContext';
import { SettingsProvider } from './context/SettingsContext';
import { TestimonialProvider } from './context/TestimonialContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import ApiStatusNotification from './components/ApiStatusNotification';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Posts from './pages/admin/Posts';
import Reviews from './pages/admin/Reviews';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import AdminLogin from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useApiStatus } from './hooks/useApiStatus';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { isApiAvailable, error } = useApiStatus();

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
    <Router>
      <div className="min-h-screen bg-white">
        <Header onCartClick={handleCartClick} />

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

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="posts" element={<Posts />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
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

        <ApiStatusNotification 
          isApiAvailable={isApiAvailable}
          error={error}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ProductProvider>
      <OrderProvider>
        <PostProvider>
          <UserProvider>
            <SettingsProvider>
              <TestimonialProvider>
                <CartProvider>
                  <AppContent />
                </CartProvider>
              </TestimonialProvider>
            </SettingsProvider>
          </UserProvider>
        </PostProvider>
      </OrderProvider>
    </ProductProvider>
  );
}

export default App;
