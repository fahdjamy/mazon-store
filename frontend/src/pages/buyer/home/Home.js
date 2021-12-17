import React, { useEffect } from "react";
import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  EyeFilled,
  UserOutlined,
  LaptopOutlined,
  FileDoneOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TopNav from "../../../components/auth/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDetailsAsync } from "../../../store/actions/auth";

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoggedInUserDetailsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user.userRole !== "buyer" ? (
        <Navigate
          to="/forbidden"
          replace
          state={{
            referrer: location.pathname,
            from: location,
          }}
        />
      ) : (
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <TopNav />
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1" icon={<EyeFilled />}>
                  <Link to="/buyer">Products</Link>
                </Menu.Item>

                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="View Orders"
                >
                  <Menu.Item key="5">
                    <Link to="/buyer/orders">My Orders</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/buyer/order-history">Order History</Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="2" icon={<UserOutlined />}>
                  <Link to="/buyer/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FileDoneOutlined />}>
                  <Link to="/buyer/receipt">Receipts</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
                  <Link to="/buyer/follow-seller">sellers</Link>
                </Menu.Item>
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
      )}
    </>
  );
}

export default Home;
