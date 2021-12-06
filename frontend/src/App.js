import React from "react";
// import Home from "./components/UI/Home";
import Login from "./components/Auth/Login";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
// import "./Home.css";
import { Typography } from "antd";

const { Title } = Typography;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
  return <Login />;
}

export default App;
