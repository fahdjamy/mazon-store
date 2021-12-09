import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index";
import ProjectRoutes from "./components/ProjectRoutes";

ReactDOM.render(
  <Provider store={store}>
    <ProjectRoutes />
  </Provider>,
  document.getElementById("root")
);
