import axios from "../../../api/axiosInit";

import {
  getUser,
  updateUser,
  approveSeller,
  getUserSuccess,
  getUserFailure,

  updateUserSuccess,
  updateUserFailure,
  approveSellerSuccess,
  approveSellerFailure,
} from "../../reducers/authSlice";

export const getUserAsync = (userId) => {
  return async (dispatch) => {
    dispatch(getUser())
    try {
      const response = await axios.get(`/users/${userId}`);
      dispatch(getUserSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(getUserFailure("Something went wrong"));
    }
  };
};

export const approveSellerAsync = (sellerId) => {
  return async (dispatch) => {
    dispatch(approveSeller());
    try {
      const response = await axios.put(`/users/${sellerId}/approve`);
      dispatch(approveSellerSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(approveSellerFailure("something went wrong!!"));
    }
  };
};

export const updateUserAsync = (userId) => {
  return async (dispatch) => {
    dispatch(updateUser());
    try {
      const response = await axios.put(`/users/${userId}`);
      dispatch(updateUserSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(updateUserFailure("something went wrong!!"));
    }
  };
}
