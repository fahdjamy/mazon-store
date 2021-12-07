import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/admin/home/Home";
import { Home as BuyerHome } from "./pages/buyer/home/Home";
import ApprovedSeller from "./pages/admin/seller/ApprovedSeller";
import NotApprovedSeller from "./pages/admin/seller/NotApprovedSeller";
import ApprovedReviews from "./pages/admin/review/ApprovedReviews";
import NotApprovedReviews from "./pages/admin/review/NotApprovedReviews";
import Product from "./pages/buyer/products/Product";
import Order from "./pages/buyer/orders/Order";
import OrderHistory from "./pages/buyer/order-history/OrderHistory";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Home />}>
        <Route path="approved-seller" element={<ApprovedSeller />} />
        <Route path="not-approved-seller" element={<NotApprovedSeller />} />
        <Route path="approved-review" element={<ApprovedReviews />} />
        <Route path="not-approved-review" element={<NotApprovedReviews />} />
      </Route>
      <Route path="buyer" element={<BuyerHome />}>
        <Route path="products" element={<Product />} />
        <Route path="orders" element={<Order />} />
        <Route path="order-history" element={<OrderHistory />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
