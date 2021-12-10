import React from "react";
import ReactDOM from "react-dom";
import store from "./store/index";
import { Provider } from "react-redux";

import "./index.css";
import AllRoutes from "./routes/AllRoutes";

ReactDOM.render(
  <Provider store={store}>
    <AllRoutes />
  </Provider>,
  document.getElementById("root")
);
