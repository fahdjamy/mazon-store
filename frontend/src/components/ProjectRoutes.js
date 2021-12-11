import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { tryReLogin } from "../store/actions/auth";
import App from "../App";
import Home from "../pages/admin/home/Home";
import ApprovedReviews from "../pages/admin/review/ApprovedReviews";
import NotApprovedReviews from "../pages/admin/review/NotApprovedReviews";
import ApprovedSeller from "../pages/admin/seller/ApprovedSeller";
import NotApprovedSeller from "../pages/admin/seller/NotApprovedSeller";
import OrderHistory from "../pages/buyer/order-history/OrderHistory";
import Order from "../pages/buyer/orders/Order";
import Product from "../pages/buyer/products/Product";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import BuyerHome from "../pages/buyer/home/Home";
import SellerProduct from "../pages/seller/product/Product";
import SellerOrder from "../pages/seller/order/Order";
import SellerHome from "../pages/seller/home/Home";
import AddProduct from "../pages/seller/product/AddProduct";
import OrderStatus from "../pages/seller/order-status/OrderStatus";
import Cart from "../pages/buyer/cart/Cart";
import Payment from "../pages/buyer/payment/Payment";
import RequireAuth from "./RequireAuth";

export default function ProjectRoutes() {
  const dispatch = useDispatch();
  dispatch(tryReLogin());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
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
            //  path="approved-seller"
            index
            element={<ApprovedSeller />}
          />
          <Route path="not-approved-seller" element={<NotApprovedSeller />} />
          <Route path="approved-review" element={<ApprovedReviews />} />
          <Route path="not-approved-review" element={<NotApprovedReviews />} />
        </Route>
        <Route path="/buyer" element={<BuyerHome />}>
          <Route
            // path="products"
            index
            element={<Product />}
          />
          <Route path="orders" element={<Order />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/seller" element={<SellerHome />}>
          <Route path="view-products" element={<SellerProduct />} />
          <Route path="view-orders" element={<SellerOrder />} />
          <Route path="add-product" element={<AddProduct />} />
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
