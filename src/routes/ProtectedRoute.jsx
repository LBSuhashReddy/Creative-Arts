import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAuth();

  // 1. Check if the user is logged in
  if (!currentUser) {
    // If not, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // 2. Check if the user has the required role
  if (requiredRole && currentUser.role !== requiredRole) {
    // If they don't have the role, redirect them to the homepage
    return <Navigate to="/" />;
  }

  // 3. If all checks pass, show the page
  return children;
};

export default ProtectedRoute;