import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Context from './Context';

const PrivateRoute = () => {
  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;

  // Use Outlet to render the child element (which would be Create Course or Update Course component) if there's an authUser
  return authUser ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute;