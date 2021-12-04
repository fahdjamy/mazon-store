import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./Home.css";
import { Typography } from "antd";

const { Title } = Typography;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Home() {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home;
