import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role
    return <div className="text-center text-red-600 font-bold mt-10">Access denied: You do not have permission to view this page.</div>;
  }

  return children;
};

export default ProtectedRoute; 