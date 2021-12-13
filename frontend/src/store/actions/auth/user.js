import axios from "../../../api/axiosInit";

import {
  getUser,
  updateUser,
  getSellers,
  approveSeller,
  getUserSuccess,
  getUserFailure,

  getSellersFailure,
  getSellersSuccess,
  updateUserSuccess,
  updateUserFailure,
  approveSellerSuccess,
  approveSellerFailure,
} from "../../reducers/authSlice";

import {
  followSeller,
  followSellerSuccess,
  followSellerFailure,

  unfollowSeller,
  unfollowSellerFailure,
  unfollowSellerSuccess,
} from "../../reducers/userSlice";

export const getLoggedInUserDetailsAsync = () => {
  return async (dispatch) => {
    dispatch(getUser())
    try {
      const response = await axios.get(`/users/filter?byloggedInUser`);
      dispatch(getUserSuccess(response.data));
    } catch ({response}) {
      dispatch(getUserFailure(response?.data?.error?.message || "Something went wrong"));
    }
  };
};

export const approveSellerAsync = (sellerId) => {
  return async (dispatch) => {
    dispatch(approveSeller());
    try {
      const response = await axios.put(`/users/${sellerId}/approve`);
      dispatch(approveSellerSuccess(response.data));
    } catch ({response}) {
      dispatch(approveSellerFailure(response?.data?.error?.message || "something went wrong!!"));
    }
  };
};

export const updateUserAsync = (userId) => {
  return async (dispatch) => {
    dispatch(updateUser());
    try {
      const response = await axios.put(`/users/${userId}`);
      dispatch(updateUserSuccess(response.data));
    } catch ({response}) {
      dispatch(updateUserFailure(response?.data?.error?.message || "something went wrong!!"));
    }
  };
}

export const getSellersAsync = () => {
  return async (dispatch) => {
    dispatch(getSellers());
    try {
      const response = await axios.get(`/users/filter?byRole=SELLER`);
      dispatch(getSellersSuccess(response.data));
    } catch ({response}) {
      dispatch(getSellersFailure(response?.data?.error?.message || "something went wrong!!"));
    }
  };
}

export const sendFollowReqAsync = (sellerId) => {
  return async (dispatch) => {
    dispatch(followSeller());
    try {
      const response = await axios.post(`/users/${sellerId}/follow`);
      dispatch(followSellerSuccess(response.data));
    } catch ({response}) {
      dispatch(followSellerFailure(response?.data?.error?.message || "something went wrong!!"));
    }
  }
}

export const sendUnFollowReqAsync = (sellerId) => {
  return async (dispatch) => {
    dispatch(unfollowSeller());
    try {
      const response = await axios.delete(`/users/${sellerId}/unfollow`);
      dispatch(unfollowSellerSuccess(response.data));
    } catch ({response}) {
      dispatch(unfollowSellerFailure(response?.data?.error?.message || "something went wrong!!"));
    }
  }
}
