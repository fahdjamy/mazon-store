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
