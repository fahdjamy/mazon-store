import axios from "../../api/axiosInit";

import {
  getPayments,
  getPaymentsFailure,
  getPaymentsSuccess,

  makePayment,
  makePaymentFailure,
  makePaymentSuccess,
} from "../reducers/paymentSlice";

export const getPaymentsAsync = (buyerId) => {
  return async (dispatch) => {
    dispatch(getPayments())
    try {
      const response = await axios.get(`/users/${buyerId}/payments`);
      console.log(response.data);
      dispatch(getPaymentsSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(getPaymentsFailure("Something went wrong"));
    }
  };
};

export const makePaymentAsync = (productId, data) => {
  return async (dispatch) => {
    dispatch(makePayment());
    try {
      const response = await axios.post(`/products/${productId}/payments`, data);
      dispatch(makePaymentSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(makePaymentFailure("something went wrong!!"));
    }
  };
};
