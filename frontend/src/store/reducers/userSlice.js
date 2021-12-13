import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  userData: null,
  fetchingUser: false,
  isRegistering: false,
  approvalMessage: null,
  isUpdatingUser: false,
  fetchingSellers: false,
  isApprovingSeller: false,
  fetchingSellersError: null,
  registrationSuccess: false,

  followReqError: false,
  sendingFollowReq: false,
  followReqSuccess: false,

  unFollowReqError: false,
  sendingUnFollowReq: false,
  unFollowReqSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
    // follow requests state handlers.
    followSeller: (state) => {
      state.isUpdatingUser = true;
    },
    followSellerSuccess: (state) => {
      state.followReqError = null;
      state.followReqSuccess = true;
      state.sendingFollowReq = false;
    },
    followSellerFailure: (state, { payload }) => {
      state.followReqError = payload;
      state.followReqSuccess = false;
      state.sendingFollowReq = false;
    },
    // un follow requests state handlers.
    unfollowSeller: (state) => {
      state.unFollowReqError = null;
      state.sendingUnFollowReq = true;
      state.unFollowReqSuccess = false;
    },
    unfollowSellerSuccess: (state) => {
      state.unFollowReqError = null;
      state.sendingUnFollowReq = false;
      state.unFollowReqSuccess = false;
    },
    unfollowSellerFailure: (state, { payload }) => {
      state.sendingUnFollowReq = false;
      state.unFollowReqError = payload;
      state.unFollowReqSuccess = false;
    },
    // reset back all unfollow/follow states.
    resetFollowState: (state) => {
      state.followReqError = null;
      state.followReqSuccess = false;
      state.sendingFollowReq = false;

      state.unFollowReqError = false;
      state.sendingUnFollowReq = false;
      state.unFollowReqSuccess = false;
    }
  },
});

export const {
  getUser,
  register,
  getSellers,
  updateUser,
  approveSeller,
  getUserFailure,
  getUserSuccess,
  registerFailure,
  registerSuccess,
  updateUserSuccess,
  updateUserFailure,
  getSellersSuccess,
  getSellersFailure,
  approveSellerSuccess,
  approveSellerFailure,

  followSeller,
  followSellerFailure,
  followSellerSuccess,

  unfollowSeller,
  unfollowSellerFailure,
  unfollowSellerSuccess,
} = userSlice.actions;

export default userSlice.reducer;
