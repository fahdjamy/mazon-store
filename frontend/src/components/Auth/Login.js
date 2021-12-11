import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Typography,
  Card,
  notification,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";
import { loginAsync } from "../../store/actions/auth";

const { Title } = Typography;

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Error",
      description: auth.error,
    });
  };

  useEffect(() => {
    if (auth.error) {
      openNotificationWithIcon("error");
    }
    if (auth.isAuthenticated && auth.userRole === "admin") {
      navigate("/admin");
    }
  }, [auth]);

  const onFinish = (values) => {
    dispatch(loginAsync(values));
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Card className="box-shadow">
          <Title level={2}>Login</Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size={"large"}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or &nbsp;
              <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </>
  );
}

export default Login;
