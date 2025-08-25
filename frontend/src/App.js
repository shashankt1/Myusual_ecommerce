import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import ProductDetail from './routes/ProductDetail';
import Login from './routes/Login';
import Register from './routes/Register';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Orders from './routes/Orders';
import Admin from './routes/Admin';
import ProtectedRoute from './routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    setIsAuthenticated(!!token);
    setUserRoles(roles);
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="min-h-screen bg-background py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoute authenticated={isAuthenticated} />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route element={<ProtectedRoute authenticated={isAuthenticated} roles={['admin']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          {/* Catch-all route */}
          <Route path="*" element={<div className="text-center">Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}