import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  reviews: [],
  makingPayment: false,
  fetchingReviews: false,
};

export const reviewSlice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    getReviews: (state) => {
      state.error = null;
      state.fetchingReviews = true;
    },
    getReviewsSuccess: (state, { payload }) => {
      state.error = null;
      state.reviews = payload;
      state.fetchingReviews = false;
    },
    getReviewsFailure: (state, { payload }) => {
      state.error = payload;
      state.fetchingReviews = false;
    },
  },
});

export const {
  getReviews,
  getReviewsFailure,
  getReviewsSuccess,
} = reviewSlice.actions;

export default reviewSlice.reducer;
