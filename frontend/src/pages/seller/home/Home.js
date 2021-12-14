import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import "./Home.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { EyeFilled, LaptopOutlined } from "@ant-design/icons";
import TopNav from "../../../components/auth/TopNav";

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

function Home() {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <TopNav />
        {auth.userRole !== "seller" ? (
          <Navigate
            to={`/${auth.userRole}`}
            replace
            state={{
              referrer: location.pathname,
              from: location,
            }}
          />
        ) : auth.userData?.approved ? (
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu key="sub1" icon={<EyeFilled />} title="View Products">
                  <Menu.Item key="1">
                    <Link to="/seller">Products</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="View Orders"
                >
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
        ) : (
          <div>Wait for approval from the admin</div>
        )}
      </Layout>
    </>
  );
}

export default Home;
