import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import logo from '../public/logo.svg';

export default function Navbar() {
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/">
          <img src={logo} alt="Myusual Logo" className="h-10 w-auto" />
        </Link>
        <div className="flex space-x-6 items-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-accent font-bold' : 'text-gray-700')}>
            Home
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'text-accent font-bold' : 'text-gray-700')}>
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-accent text-black rounded-full px-2 text-xs font-semibold">{cartCount}</span>
            )}
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/orders" className={({ isActive }) => (isActive ? 'text-accent font-bold' : 'text-gray-700')}>
                My Orders
              </NavLink>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? 'text-accent font-bold' : 'text-gray-700')}>
                Admin
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-accent font-bold' : 'text-gray-700')}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
