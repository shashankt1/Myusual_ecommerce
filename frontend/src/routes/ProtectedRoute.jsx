import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ authenticated, roles, children }) {
  const token = localStorage.getItem('token');
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (!authenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    const authorized = roles.some(role => userRoles.includes(role));
    if (!authorized) {
      return <Navigate to="/" replace />;
    }
  }

  return children ? children : <Outlet />;
}
