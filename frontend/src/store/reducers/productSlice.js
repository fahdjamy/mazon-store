import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  error: null,
  products: [],
  isLoading: false,
  reviewError: null,
  isCreatingReview: false,
  isLoadingReviews: false,
  isApprovingReview: false,
  creatingReviewError: null,
  approvingReviewError: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAddedSuccess: (state, { payload }) => {
      state.products = [...state.products, payload];
    },
    getProducts: (state) => {
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
    productAddFailure: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
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
    ////////// Reviews
    // get all reviews
    getProductReviews: (state, { payload }) => {
      state.reviews = payload;
      state.reviewError = null;
      state.isLoadingReviews = true;
    },
    getProductReviewsSuccess: (state, { payload }) => {
      state.reviewError = null;
      state.reviews = [...payload];
      state.isLoadingReviews = false;
    },
    getProductReviewsFailure: (state, { payload }) => {
      state.reviewError = payload;
      state.isLoadingReviews = false;
    },
    // create a review
    createProductReview: (state) => {
      state.reviews = [];
      state.isCreatingReview = true;
      state.creatingReviewError = null;
    },
    createProductReviewSuccess: (state, { payload }) => {
      state.isCreatingReview = false;
      state.creatingReviewError = null;
      state.reviews = [...state.reviews, payload];
    },
    createProductReviewFailure: (state, { payload }) => {
      state.isCreatingReview = false;
      state.creatingReviewError = payload;
    },
    // approve a review
    approveReview: (state) => {
      state.reviews = [];
      state.isApprovingReview = true;
      state.approvingReviewError = null;
    },
    approveReviewSuccess: (state, { payload }) => {
      state.isApprovingReview = false;
      state.approvingReviewError = null;
      const curRevIndex = state.reviews.findIndex(
        review => review.id === payload.id
      );
      let reviewsToUpdate = state.reviews;
      reviewsToUpdate.splice(curRevIndex, 1);
      state.reviews = [...reviewsToUpdate, payload];
    },
    approveReviewFailure: (state, { payload }) => {
      state.isApprovingReview = false;
      state.approvingReviewError = payload;
    },
  },
});

export const {
  addProduct,
  productAddFailure,
  productAddedSuccess,
  
  getProducts,
  getProductsSuccess,
  getProductsFailure,
  
  editProduct,
  editProductsSuccess,
  editProductsFailure,
  
  approveReview,
  approveReviewSuccess,
  approveReviewFailure,
  
  deleteProduct,
  deleteProductsSuccess,
  deleteProductsFailure,
  
  getProductReviews,
  getProductReviewsSuccess,
  getProductReviewsFailure,

  createProductReview,
  createProductReviewSuccess,
  createProductReviewFailure,
} = productSlice.actions;

export default productSlice.reducer;
