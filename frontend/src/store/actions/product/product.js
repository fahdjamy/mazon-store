import axios from "../../../api/axiosInit";

import {
  deleteProductsFailure,
  deleteProductsSuccess,
  editProductsFailure,
  editProductsSuccess,
  getProducts,
  getProductsFailure,
  getProductsSuccess,
  productAddedSuccess,
  productAddFailure,
} from "../../reducers/productSlice";

export const addProductAsync = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/products", data);
      console.log(response.data);
      dispatch(productAddedSuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(productAddFailure("Something went wrong"));
    }
  };
};

export const fetchProductAsync = () => {
  return async (dispatch) => {
    dispatch(getProducts());
    try {
      const response = await axios.get("/products");
      dispatch(getProductsSuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(getProductsFailure("something went wrong!!"));
    }
  };
};

export const editProductAsync = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/products/${id}`, data);
      dispatch(editProductsSuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(editProductsFailure("something went wrong!!"));
    }
  };
};

export const deleteProductAsync = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/products/${id}`);
      dispatch(deleteProductsSuccess(id));
    } catch (e) {
      console.log(e);
      dispatch(deleteProductsFailure("something went wrong!!"));
    }
  };
};
