import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useSelector(state => state.auth);

  return auth.isAuthenticated === true
    ? children
    : <Navigate
        to="/login"
        replace
        state={{
          referrer: location.pathname,
          from: location,
        }}
      />;
}

export default RequireAuth;
