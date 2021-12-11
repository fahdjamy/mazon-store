import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAddedSuccess: (state, { payload }) => {
      state.products = [...state.products, payload];
    },
    getProducts: (state, { payload }) => {
      state.isLoading = true;
      state.products = [];
      state.error = null;
    },
    getProductsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products = [...payload];
      state.error = null;
    },
    getProductsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    editProductsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products = state.products.map((p) => {
        if (p.id === payload.id) {
          return { ...p, ...payload };
        }
        return p;
      });
      state.error = null;
    },
    editProductsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    deleteProductsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products = state.products.filter((p) => {
        return p.id !== payload;
      });
      state.error = null;
    },
    deleteProductsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    productAddFailure: (state) => {},
    deleteProduct: (state, { payload }) => {
      state.products.filter((p) => {
        return p.id !== payload;
      });
    },
    editProduct: (state, { payload }) => {
      state.products.map((p) => {
        if (p.id === payload.id) {
          return { ...p, ...payload };
        }
        return p;
      });
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  editProduct,
  productAddFailure,
  productAddedSuccess,
  getProductsFailure,
  getProductsSuccess,
  getProducts,
  editProductsSuccess,
  deleteProductsSuccess,
  editProductsFailure,
  deleteProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;
