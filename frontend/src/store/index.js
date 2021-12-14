import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./reducers/userSlice";
import authReducer from "./reducers/authSlice";
import orderSlice from "./reducers/orderSlice";
import cartReducer from "./reducers/cartSlice";
import reviewSlice from "./reducers/reviewSlice";
import productReducer from "./reducers/productSlice";
import paymentReducer from "./reducers/paymentSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    cart: cartReducer,
    auth: authReducer,
    orders: orderSlice,
    reviews: reviewSlice,
    product: productReducer,
    payment: paymentReducer
  },
});
