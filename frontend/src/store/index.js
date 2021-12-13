import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authSlice";
import orderSlice from "./reducers/orderSlice";
import cartReducer from "./reducers/cartSlice";
import reviewSlice from "./reducers/reviewSlice";
import productReducer from "./reducers/productSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderSlice,
    reviews: reviewSlice,
    product: productReducer,
  },
});
