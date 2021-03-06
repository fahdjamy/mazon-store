import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  sellers: [],
  userRole: "",
  userData: null,
  isLogging: false,
  fetchingUser: false,
  isRegistering: false,
  approvalMessage: null,
  isUpdatingUser: false,
  isAuthenticated: false,
  fetchingSellers: false,
  updateUserSuccess: false,
  isApprovingSeller: false,
  fetchingSellersError: null,
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
    getSellers: (state) => {
      state.fetchingSellers = true;
    },
    getSellersSuccess: (state, { payload }) => {
      state.sellers = payload;
      state.fetchingSellers = false;
      state.fetchingSellersError = null;
    },
    getSellersFailure: (state, { payload }) => {
      state.fetchingSellers = false;
      state.fetchingSellersError = payload;
    },
    approveSeller: (state) => {
      state.isApprovingSeller = true;
    },
    approveSellerSuccess: (state, { payload }) => {
      state.isApprovingSeller = false;
      state.approvalMessage = payload.message;
      state.sellers = state.sellers.filter(
        seller => seller.id !== payload.sellerId
      )
    },
    approveSellerFailure: (state, { payload }) => {
      state.error = payload;
      state.isApprovingSeller = false;
      state.approvalMessage = payload;
    },
    updateUser: (state) => {
      state.updateSuccess = false;
      state.isUpdatingUser = true;
    },
    updateUserSuccess: (state, { payload }) => {
      state.error = null;
      state.userData = payload;
      state.updateSuccess = true;
      state.isUpdatingUser = false;
    },
    updateUserFailure: (state, { payload }) => {
      state.error = payload;
      state.updateSuccess = false;
      state.isUpdatingUser = false;
    },
    resetUpdateUserState: (state) => {
      state.error = null;
      state.updateSuccess = false;
    }
  },
});

export const {
  login,
  logout,
  getUser,
  register,
  getSellers,
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
  getSellersSuccess,
  getSellersFailure,
  resetUpdateUserState,
  approveSellerSuccess,
  approveSellerFailure,

} = authSlice.actions;

export default authSlice.reducer;
