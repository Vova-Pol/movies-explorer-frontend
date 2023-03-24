import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/signup" replace />;
}

export default ProtectedRoute;
