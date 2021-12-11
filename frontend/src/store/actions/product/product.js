import axios from "../../../api/axiosInit";

import {
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
      // dispatch(productAddFailure("invalid login credentials."));
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
