import React from "react";
import "antd/dist/antd.css";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  EyeFilled,
  LaptopOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Home.css";

import ApprovedSeller from "../seller/ApprovedSeller";
import NotApprovedSeller from "../seller/NotApprovedSeller";
import ApprovedReviews from "../review/ApprovedReviews";
import NotApprovedReviews from "../review/NotApprovedReviews";
// import NotApprovedSeller from "./pages/admin/seller/NotApprovedSeller";
// import ApprovedReviews from "./pages/admin/review/ApprovedReviews";
// import NotApprovedReviews from "./pages/admin/review/NotApprovedReviews";
// import ApprovedSeller from "./pages/admin/seller/ApprovedSeller";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function Home() {
  return (
    <>
      <Layout
        style={{
          height: "100vh",
        }}
      >
        <Header className="header">
          <div className="logo">
            <img
              src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png"
              alt=""
            />
          </div>

          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
            <Menu.Item key="1" style={{ marginLeft: "auto" }}>
              <Link to="/login">
                Logout
                <LogoutOutlined
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingLeft: "5px",
                  }}
                />
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<EyeFilled />} title="View Sellers">
                <Menu.Item key="1">
                  <Link to="/admin/approved-seller">Approved</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/admin/not-approved-seller">Not Approved</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<LaptopOutlined />}
                title="View Reviews"
              >
                <Menu.Item key="5">
                  <Link to="/admin/approved-review">Approved</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/admin/not-approved-review">Not Approved</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
              {/* <Route path="/approved-seller" element={<ApprovedSeller />} />
              <Route
                path="/not-approved-seller"
                element={<NotApprovedSeller />}
              />
              <Route path="/approved-review" element={<ApprovedReviews />} />
              <Route
                path="/not-approved-review"
                element={<NotApprovedReviews />}
              /> */}
            </Content>
            <Footer style={{ textAlign: "center" }}>WAA Project ©2021</Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;