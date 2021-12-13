import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getLoggedInUserDetailsAsync, tryReLogin } from "../store/actions/auth";
import App from "../App";
import Home from "../pages/admin/home/Home";
import ApprovedReviews from "../pages/admin/review/ApprovedReviews";
import NotApprovedReviews from "../pages/admin/review/NotApprovedReviews";
import ApprovedSeller from "../pages/admin/seller/ApprovedSeller";
import NotApprovedSeller from "../pages/admin/seller/NotApprovedSeller";
import OrderHistory from "../pages/buyer/order-history/OrderHistory";
import Order from "../pages/buyer/orders/Order";
import Product from "../pages/buyer/products/Product";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import BuyerHome from "../pages/buyer/home/Home";
import SellerProduct from "../pages/seller/product/Product";
import SellerOrder from "../pages/seller/order/Order";
import SellerHome from "../pages/seller/home/Home";
import OrderStatus from "../pages/seller/order-status/OrderStatus";
import Cart from "../pages/buyer/cart/Cart";
import RequireAuth from "./RequireAuth";
import Payment from "../pages/buyer/payment/Payment";
import Profile from "../pages/buyer/profile/Profile";
import Receipt from "../pages/buyer/receipt/Receipt";
import Follow from "../pages/buyer/seller/Follow";
import Forbidden from "../pages/forbidden/Forbidden";

export default function AllRoutes() {
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);
  dispatch(tryReLogin());

  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     dispatch(getLoggedInUserDetailsAsync());
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/" element={<Forbidden />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <RequireAuth>
                <NotApprovedSeller />
              </RequireAuth>
            }
          />
          <Route path="approved-review" element={<ApprovedReviews />} />
          <Route path="not-approved-review" element={<NotApprovedReviews />} />
        </Route>
        <Route
          path="/buyer"
          element={
            <RequireAuth>
              <BuyerHome />
            </RequireAuth>
          }
        >
          <Route index element={<Product />} />
          <Route path="orders" element={<Order />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="cart" element={<Cart />} />
          <Route path="make-payment/:productId" element={<Payment />} />
          <Route path="reciept" element={<Receipt />} />
          <Route path="profile" element={<Profile />} />
          <Route path="follow-seller" element={<Follow />} />

          {/* <Route path="/reciept" element={<Receipt />} /> */}
        </Route>
        <Route
          path="/seller"
          element={
            <RequireAuth>
              <SellerHome />
            </RequireAuth>
          }
        >
          <Route index element={<SellerProduct />} />
          <Route path="view-orders" element={<SellerOrder />} />
          <Route path="order-status" element={<OrderStatus />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
