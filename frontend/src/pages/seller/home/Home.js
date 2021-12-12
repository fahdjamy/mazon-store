import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function Home() {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
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
            <Menu.Item
              key="1"
              style={{ marginLeft: "auto", color: "white", fontWeight: "bold" }}
            >
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
              <SubMenu key="sub1" icon={<UserOutlined />} title="View Products">
                <Menu.Item key="1">
                  <Link to="/seller">Products</Link>
                </Menu.Item>
              
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="View Orders">
                <Menu.Item key="5">
                  <Link to="/seller/view-orders">Orders</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>WAA Project ©2021</Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
