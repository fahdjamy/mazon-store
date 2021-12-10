import axios from '../../../api/axiosInit';

import {
  login,
  loginFailure,
  loginSuccess,
  logout as logoutAttempt,
} from "../../reducers/authSlice";

export const loginAsync = (data) => {
  return async dispatch => {
    dispatch(login());
    try {
      const response = await axios.post("/auth/login", data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role.toLowerCase());
      dispatch(loginSuccess(response.data));
    } catch (e) {
      dispatch(loginFailure("invalid login credentials."));
    }
  }
}

export const tryReLogin = () => {
  return async dispatch => {
    dispatch(login());

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (token && role) {
      dispatch(loginSuccess({role, token}));
    } else {
      dispatch(loginFailure("Login required"));
    }
  }
}

export const logoutAsync = () => {
  return async dispatch => {
    dispatch(logoutAttempt);
    localStorage.clear();
  }
}
