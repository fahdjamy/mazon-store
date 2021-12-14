import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAsync } from "../../store/actions/auth";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Typography } from 'antd';

const { Title } = Typography;

function TopNav() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutAsync());
    navigate("/login");
  };

  const role = useSelector((state) => state.auth.userRole);

  return (
    <div>
      <Header className="header">
        <div className="logo">
        <Title style={{color:"white", paddingTop:"10px"}} level={4} italic>YO-market</Title>
          {/* <img
            src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png"
            // src="https://spng.pngfind.com/pngs/s/90-903216_our-vision-has-no-limits-google-g-logo.png"
            alt=""
          /> */}
        </div>

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
          {role === "buyer" ? (
            <>
              <Menu.Item key="1" style={{ marginLeft: "auto" }}>
                <Link to="/buyer/cart">
                  <ShoppingCartOutlined
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              </Menu.Item>
              <Menu.Item key="2" onClick={logoutHandler}>
                Logout
                <LogoutOutlined
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingLeft: "5px",
                  }}
                />
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              key="1"
              style={{ marginLeft: "auto" }}
              onClick={logoutHandler}
            >
              Logout
              <LogoutOutlined
                style={{
                  color: "white",
                  fontWeight: "bold",
                  paddingLeft: "5px",
                }}
              />
            </Menu.Item>
          )}
        </Menu>
      </Header>
    </div>
  );
}

export default TopNav;
