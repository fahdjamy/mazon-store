import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  userRole: "",
  userData: null,
  isLogging: false,
  fetchingUser: false,
  isRegistering: false,
  approvalMessage: null,
  isUpdatingUser: false,
  isAuthenticated: false,
  isApprovingSeller: false,
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
    getUser: (state) => {
      state.fetchingUser = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.error = null;
      state.userData = payload;
      state.fetchingUser = false;
    },
    getUserFailure: (state, { payload }) => {
      state.error = payload;
      state.fetchingUser = false;
    },
    approveSeller: (state) => {
      state.isApprovingSeller = true;
    },
    approveSellerSuccess: (state, { payload }) => {
      state.isApprovingSeller = false;
      state.approvalMessage = payload;
    },
    approveSellerFailure: (state, { payload }) => {
      state.error = payload;
      state.isApprovingSeller = false;
      state.approvalMessage = payload;
    },
    updateUser: (state) => {
      state.isUpdatingUser = true;
    },
    updateUserSuccess: (state, { payload }) => {
      state.error = null;
      state.userData = payload;
      state.isUpdatingUser = false;
    },
    updateUserFailure: (state, { payload }) => {
      state.error = payload;
      state.isUpdatingUser = false;
    },
  },
});

export const {
  login,
  logout,
  getUser,
  register,
  updateUser,
  loginSuccess,
  loginFailure,
  approveSeller,
  getUserFailure,
  getUserSuccess,
  registerFailure,
  registerSuccess,
  updateUserSuccess,
  updateUserFailure,
  approveSellerSuccess,
  approveSellerFailure,

} = authSlice.actions;

export default authSlice.reducer;
