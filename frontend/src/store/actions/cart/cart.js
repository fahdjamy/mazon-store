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
    } catch (e) {
      console.log(e);
      dispatch(getCartFailure("Something went wrong"));
    }
  };
};

export const addProductToCartAsync = (cartId, productId) => {
  return async (dispatch) => {
    dispatch(addProductToCart());
    try {
      const response = await axios.put(`/shoppingCart/${cartId}/products/${productId}`);
      dispatch(addProductToCartSuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(addProductToCartFailure("something went wrong!!"));
    }
  };
};

export const removeProductFromCartAsync = (cartId, productId) => {
  return async (dispatch) => {
    dispatch(removeProductFromCart());
    try {
      const response = await axios.put(`/shoppingCart/${cartId}/products/${productId}/remove`);
      dispatch(removeProductFromCartSuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(removeProductFromCartFailure("something went wrong!!"));
    }
  };
}
