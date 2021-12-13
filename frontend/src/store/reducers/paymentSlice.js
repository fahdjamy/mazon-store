import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  payment: null,
  makingPayment: false,
  fetchingPayments: false,
};

export const paymentSlice = createSlice({
  initialState,
  name: "payments",
  reducers: {
    makePaymentSuccess: (state, { payload }) => {
      state.payment = payload;
      state.makingPayment = false;
    },
    makePaymentFailure: (state, { payload }) => {
      state.payment = payload;
      state.makingPayment = false;
    },
    makePayment: (state) => {
      state.makingPayment = true;
    },
    getPayments: (state) => {
      state.error = null;
      state.fetchingPayments = true;
    },
    getPaymentsSuccess: (state, { payload }) => {
      state.error = null;
      state.payment = payload;
      state.fetchingPayments = false;
    },
    getPaymentsFailure: (state, { payload }) => {
      state.fetchingPayments = false;
      state.error = payload;
    },
  },
});

export const {
  getPayments,
  makePayment,

  getPaymentsFailure,
  getPaymentsSuccess,

  makePaymentSuccess,
  makePaymentFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;
