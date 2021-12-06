import React from "react";
import { Form, Input, Button, Checkbox, Row, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import "antd/dist/antd.css";
import { Col, Divider, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const DemoBox = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

function Login() {
  let navigate = useNavigate();

  const onFinish = (values) => {
    navigate("/admin");
    console.log("Received values of form: ", values);
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
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </>
  );
}

export default Login;
