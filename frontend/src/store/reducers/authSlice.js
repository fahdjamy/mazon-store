import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  userRole: "",
  isLogging: false,
  isAuthenticated: false,
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
  loginSuccess,
  loginFailure,
} = authSlice.actions;

export default authSlice.reducer;
