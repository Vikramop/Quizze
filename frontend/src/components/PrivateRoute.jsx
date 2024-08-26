import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check for authentication token

  return isAuthenticated ? Element : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
