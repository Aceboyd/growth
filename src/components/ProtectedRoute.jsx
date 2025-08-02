import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="../pages/SignIn.jsx" replace />; // ✅ redirects to /signin if not authenticated
  }

  return children;
};

export default ProtectedRoute;
