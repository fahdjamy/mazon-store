import axios from "../../../api/axiosInit";

import {
  approveReview,
  approveReviewSuccess,
  approveReviewFailure,

  createProductReview,
  createProductReviewSuccess,
  createProductReviewFailure,

  getProductReviews,
  getProductReviewsSuccess,
  getProductReviewsFailure,
} from "../../reducers/productSlice";

export const addReviewAsync = (pdtId, data) => {
  return async (dispatch) => {
    dispatch(createProductReview());
    try {
      const response = await axios.post(`/products/${pdtId}/reviews`, data);
      dispatch(createProductReviewSuccess(response.data));
    } catch (e) {
      dispatch(createProductReviewFailure("Something went wrong"));
    }
  };
};

export const getProductReviewsAsync = (pdtId) => {
  return async (dispatch) => {
    dispatch(getProductReviews());
    try {
      const response = await axios.get(`/products/${pdtId}/reviews`);
      dispatch(getProductReviewsSuccess(response.data));
    } catch (e) {
      dispatch(getProductReviewsFailure("something went wrong!!"));
    }
  };
};

export const approveReviewAsync = (reviewId) => {
  return async (dispatch) => {
    dispatch(approveReview());
    try {
      // const response = await axios.put(`/reviews/${reviewId}/approve`);
      await axios.put(`/reviews/${reviewId}/approve`);
      dispatch(approveReviewSuccess({
        reviewId: reviewId,
        message: "review approved successfully",
      }));
      // dispatch(approveReviewSuccess(response.data));
    } catch (e) {
      dispatch(approveReviewFailure("something went wrong!!"));
    }
  };
};
