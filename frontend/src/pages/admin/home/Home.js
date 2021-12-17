import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";
import TopNav from "../../../components/auth/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDetailsAsync } from "../../../store/actions/auth";

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
      {user.userRole !== "admin" ? (
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
                defaultOpenKeys={["sub1"]}
                defaultSelectedKeys={["1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1" icon={<CheckCircleOutlined />}>
                  <Link to="/admin">Not Approved Sellers</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CheckOutlined />}>
                  <Link to="/admin/not-approved-review">
                    Not Approved Reviews
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
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
