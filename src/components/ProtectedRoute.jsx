import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user?.isAdmin) {
    // Redirect to unauthorized page or homepage if not admin
    return <Navigate to="/unauthorized" />;
  }

  // Render the children components (i.e., the protected page)
  return children;
};

export default ProtectedRoute;
