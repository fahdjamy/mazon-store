import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  userRole: "",
  userData: null,
  isLogging: false,
  isRegistering: false,
  isAuthenticated: false,
  registrationSuccess: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state) => {
      state.error = null;
      state.userRole = "";
      state.isLogging = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, { payload }) => {
      state.error = null;
      state.isLogging = false;
      state.isAuthenticated = true;
      state.userRole = payload?.role.toLowerCase() || "";
    },
    loginFailure: (state, { payload }) => {
      state.userRole = "";
      state.error = payload;
      state.isLogging = false;
      state.isAuthenticated = false;
    },
    register: (state) => {
      state.error = null;
      state.userRole = "";
      state.userData = null;
      state.isRegistering = true;
      state.isAuthenticated = false;
    },
    registerSuccess: (state, { payload }) => {
      state.error = null;
      state.userData = payload;
      state.isRegistering = false;
      // state.isAuthenticated = true;
      state.registrationSuccess = true;
      state.userRole = payload?.role.toLowerCase() || "";
    },
    registerFailure: (state, { payload }) => {
      state.userRole = "";
      state.error = payload;
      state.isRegistering = false;
      state.registrationSuccess = false;
    },
    logout: (state) => {
      state.error = null;
      state.userRole = "";
      state.isAuthenticated = false;
    },
  },
});

export const {
  login,
  logout,
  register,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
} = authSlice.actions;

export default authSlice.reducer;
