import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  error: null,
  isLoading: false,
  addingToCart: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCartSuccess: (state, { payload }) => {
      state.cart = payload;
      state.addingToCart = false;
    },
    addProductToCartFailure: (state, { payload }) => {
      state.cart = payload;
      state.addingToCart = false;
    },
    addProductToCart: (state) => {
      state.addingToCart = true;
    },
    getCart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    getCartSuccess: (state, { payload }) => {
      state.error = null;
      state.cart = payload;
      state.isLoading = false;
    },
    getCartFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    removeProductFromCartSuccess: (state, { payload }) => {
      state.cart = payload;
      state.addingToCart = false;
    },
    removeProductFromCartFailure: (state, { payload }) => {
      state.cart = payload;
      state.addingToCart = false;
    },
    removeProductFromCart: (state) => {
      state.addingToCart = true;
    },
  },
});

export const {
  getCart,
  getCartFailure,
  getCartSuccess,
  addProductToCart,
  addProductToCartSuccess,
  addProductToCartFailure,
  removeProductFromCart,
  removeProductFromCartSuccess,
  removeProductFromCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
