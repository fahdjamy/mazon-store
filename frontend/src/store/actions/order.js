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

  updateOrder,
  updateOrderSuccess,
  updateOrderFailure,
} from "../reducers/orderSlice";

export const getOrdersAsync = (buyerId) => {
  return async (dispatch) => {
    dispatch(getOrders())
    try {
      const response = await axios.get(`/users/${buyerId}/orders`);
      console.log(response.data);
      dispatch(getOrdersSuccess(response.data));
    } catch ({response}) {
      dispatch(getOrdersFailure(response?.data?.error ||  "Something went wrong"));
    }
  };
};

export const placeOrderAsync = (productId) => {
  return async (dispatch) => {
    dispatch(placeOrder());
    try {
      const response = await axios.post(`/orders/${productId}`);
      dispatch(placeOrderSuccess(response.data));
    } catch ({response}) {
      dispatch(placeOrderFailure(response?.data?.error || "something went wrong!!"));
    }
  };
};

export const cancelOrderAsync = (orderId) => {
  return async (dispatch) => {
    dispatch(cancelOrder());
    try {
      const response = await axios.put(`/orders/${orderId}/cancel`);
      dispatch(cancelOrderSuccess(response.data));
    } catch ({response}) {
      dispatch(cancelOrderFailure(response?.data?.error?.message ||  "something went wrong!!"));
    }
  };
};

export const updateOrderAsync = (buyerId, orderId, data) => {
  return async (dispatch) => {
    dispatch(updateOrder());
    try {
      const response = await axios.put(
        `/users/${buyerId}/orders/${orderId}`,
        data
      );
      dispatch(updateOrderSuccess(response.data));
    } catch ({response}) {
      dispatch(updateOrderFailure(response?.data?.error ||  "something went wrong!!"));
    }
  };
}
