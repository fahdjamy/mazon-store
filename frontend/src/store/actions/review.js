import axios from "../../api/axiosInit";
import {
  addReviewAsync,
  approveReviewAsync,
  getProductReviewsAsync
} from "./product/review";

import {
  getReviews,
  getReviewsFailure,
  getReviewsSuccess,
} from "../reducers/reviewSlice";

export const getAllReviewsAsync = () => {
  return async (dispatch) => {
    dispatch(getReviews())
    try {
      // const response = await axios.get(`/users/${buyerId}/payments`);
      const response = await axios.get(`/reviews`);
      dispatch(getReviewsSuccess(response.data));
    } catch ({response}) {
      dispatch(getReviewsFailure(response?.data?.error || "Something went wrong"));
    }
  };
};

export {
  addReviewAsync,
  approveReviewAsync,
  getProductReviewsAsync,
};
