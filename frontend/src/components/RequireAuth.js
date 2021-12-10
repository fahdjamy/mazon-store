import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';


export const RequireAuth = ({ children }) => {
  let navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  useDispatch();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth]);

  return auth.isAuthenticated === true
    ? children
    : <Navigate to="/login" replace />;
}

export default RequireAuth;
