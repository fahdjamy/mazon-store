import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  error: null,
  placingOrder: false,
  canclingOrder: false,
  updatingOrder: false,
  orderCancelled: false,
  fetchingOrders: false,
  updateOrderError: null,
  cancelOrderErrorMsg: null,
  cancelOrderSuccessMsg: null,
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
      let orders = payload;
      orders?.sort((a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      state.orders = orders;
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
      let updateOrders = [...state.orders];

      if (payload?.order) {
        updateOrders = updateOrders.filter(
          order => order.id !== payload?.order?.id
        );
        updateOrders.push(payload?.order);
      }
      state.orders = [...updateOrders];
      state.cancelOrderErrorMsg = null;
      state.cancelOrderSuccessMsg = payload?.message;
    },
    cancelOrderFailure: (state, { payload }) => {
      state.canclingOrder = false;
      state.orderCancelled = false;
      state.cancelOrderSuccessMsg = null;
      state.cancelOrderErrorMsg = payload;
    },
    cancelOrder: (state) => {
      state.orderCancelled = false;
      state.canclingOrder = true;
    },
    // update order functions.
    updateOrderSuccess: (state, { payload }) => {
      state.updatingOrder = false;
      state.updateOrderError = null;
      const orderIndex = state.orders.findIndex(
        order => order.id === payload.id
      );
      let ordersToUpdate = state.orders;
      ordersToUpdate.splice(orderIndex, 1);
      let orders = [...ordersToUpdate, payload];
      orders?.sort((a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      state.orders = orders;
    },
    updateOrderFailure: (state, { payload }) => {
      state.updatingOrder = false;
      state.updateOrderError = payload;
    },
    updateOrder: (state) => {
      state.updatingOrder = true;
    },
  },
});

export const {
  getOrders,
  placeOrder,
  cancelOrder,
  updateOrder,

  getOrdersFailure,
  getOrdersSuccess,
  
  placeOrderSuccess,
  placeOrderFailure,
  
  cancelOrderSuccess,
  updateOrderFailure,
  updateOrderSuccess,
  cancelOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
