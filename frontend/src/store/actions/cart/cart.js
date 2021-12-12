import axios from "../../../api/axiosInit";

import {
  getCart,
  getCartFailure,
  getCartSuccess,

  addProductToCart,
  addProductToCartFailure,
  addProductToCartSuccess,

  removeProductFromCart,
  removeProductFromCartFailure,
  removeProductFromCartSuccess,
} from "../../reducers/cartSlice";

export const getCartAsync = () => {
  return async (dispatch) => {
    dispatch(getCart())
    try {
      const response = await axios.get("/shoppingCart");
      console.log(response.data);
      dispatch(getCartSuccess(response.data));
    } catch ({response}) {
      dispatch(getCartFailure(response?.data?.error || "Something went wrong"));
    }
  };
};

export const addProductToCartAsync = (cartId, productId) => {
  return async (dispatch) => {
    dispatch(addProductToCart());
    try {
      const response = await axios.put(`/shoppingCart/${cartId}/products/${productId}`);
      dispatch(addProductToCartSuccess(response.data));
    } catch ({response}) {
      dispatch(addProductToCartFailure(response?.data?.error || "something went wrong!!"));
    }
  };
};

export const removeProductFromCartAsync = (cartId, productId) => {
  return async (dispatch) => {
    dispatch(removeProductFromCart());
    try {
      const response = await axios.put(`/shoppingCart/${cartId}/products/${productId}/remove`);
      dispatch(removeProductFromCartSuccess(response.data));
    } catch ({response}) {
      dispatch(removeProductFromCartFailure(response?.data?.error || "something went wrong!!"));
    }
  };
}
