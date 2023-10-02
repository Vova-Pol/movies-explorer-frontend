import React, { FC, ReactComponentElement } from 'react';
import { Navigate } from 'react-router-dom';
import { MAIN_PAGE_URL } from '../../utils/constants';

interface IProtectedRouteProps {
  children: ReactComponentElement<any>;
  loggedIn: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, loggedIn }) => {
  return loggedIn ? children : <Navigate to={MAIN_PAGE_URL} replace />;
};

export default ProtectedRoute;
