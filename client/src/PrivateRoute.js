import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Context from './Context';

const PrivateRoute = () => {
  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;
  const location = useLocation();

  // Use Outlet to render the child element (which would be Create Course or Update Course component) if there's an authUser
  return authUser ? <Outlet /> : <Navigate to="/signin" state={{ from: location.pathname }} />
}

export default PrivateRoute;