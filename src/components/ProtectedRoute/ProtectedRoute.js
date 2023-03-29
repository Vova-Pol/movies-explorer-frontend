import React from 'react';
import { Navigate } from 'react-router-dom';
import { MAIN_PAGE_URL } from '../../utils/constants';

function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to={MAIN_PAGE_URL} replace />;
}

export default ProtectedRoute;
