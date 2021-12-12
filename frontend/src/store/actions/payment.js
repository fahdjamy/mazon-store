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
      dispatch(getPaymentsSuccess(response.data));
    } catch ({response}) {
    
      dispatch(getPaymentsFailure(response?.data?.error || "Something went wrong"));
    }
  };
};

export const makePaymentAsync = (productId, data) => {
  return async (dispatch) => {
    dispatch(makePayment());
    try {
      const response = await axios.post(`/products/${productId}/payment`, data);
      dispatch(makePaymentSuccess(response.data));
    } catch ({response}) {
      dispatch(makePaymentFailure(response?.data?.error || "something went wrong!!"));
    }
  };
};
