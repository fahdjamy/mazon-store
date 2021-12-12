import axios from "../../api/axiosInit";

import {
  getOrders,
  getOrdersFailure,
  getOrdersSuccess,

  placeOrder,
  placeOrderSuccess,
  placeOrderFailure,

  cancelOrder,
  cancelOrderSuccess,
  cancelOrderFailure,
} from "../reducers/orderSlice";

export const getOrdersAsync = (buyerId) => {
  return async (dispatch) => {
    dispatch(getOrders())
    try {
      const response = await axios.get(`/users/${buyerId}/orders`);
      console.log(response.data);
      dispatch(getOrdersSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(getOrdersFailure("Something went wrong"));
    }
  };
};

export const placeOrderAsync = (productId) => {
  return async (dispatch) => {
    dispatch(placeOrder());
    try {
      const response = await axios.post(`/orders/${productId}`);
      dispatch(placeOrderSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(placeOrderFailure("something went wrong!!"));
    }
  };
};


export const cancelOrderAsync = (orderId) => {
  return async (dispatch) => {
    dispatch(cancelOrder());
    try {
      const response = await axios.put(`/orders/${orderId}/cancel`);
      dispatch(cancelOrderSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(cancelOrderFailure("something went wrong!!"));
    }
  };
};
