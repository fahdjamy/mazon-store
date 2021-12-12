import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  error: null,
  placingOrder: false,
  canclingOrder: false,
  orderCancelled: false,
  fetchingOrders: false,
};

export const orderSlice = createSlice({
  initialState,
  name: "orders",
  reducers: {
    // place an order functions
    placeOrderSuccess: (state, { payload }) => {
      state.payment = payload;
      state.placingOrder = false;
    },
    placeOrderFailure: (state, { payload }) => {
      state.payment = payload;
      state.placingOrder = false;
    },
    placeOrder: (state) => {
      state.placingOrder = true;
    },
    // fetch all orders functions
    getOrders: (state) => {
      state.error = null;
      state.fetchingOrders = true;
    },
    getOrdersSuccess: (state, { payload }) => {
      state.error = null;
      state.orders = payload;
      state.fetchingOrders = false;
    },
    getOrdersFailure: (state, { payload }) => {
      state.fetchingOrders = false;
      state.error = payload;
    },
    // cancel order functions
    cancelOrderSuccess: (state, { payload }) => {
      state.orderCancelled = true;
      state.canclingOrder = false;
      state.orders = state.orders.filter(
        order => order.id !== payload
      );
    },
    cancelOrderFailure: (state, { payload }) => {
      state.orderCancelled = false;
      state.canclingOrder = false;
    },
    cancelOrder: (state) => {
      state.orderCancelled = false;
      state.canclingOrder = true;
    },
  },
});

export const {
  getOrders,
  placeOrder,
  cancelOrder,

  getOrdersFailure,
  getOrdersSuccess,

  placeOrderSuccess,
  placeOrderFailure,

  cancelOrderSuccess,
  cancelOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
