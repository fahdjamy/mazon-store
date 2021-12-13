import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getLoggedInUserDetailsAsync } from '../store/actions/auth';


export const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector(state => state.auth);


  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getLoggedInUserDetailsAsync());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated]);

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
