import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import "./Register.css";
import {
  Row,
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  Typography,
  notification,
} from "antd";
import "antd/dist/antd.css";
import { Card } from "antd";
import {signupAsync} from "../../store/actions/auth";

const { Title } = Typography;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register() {
  const [form] = Form.useForm();

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: type,
      description: msg,
    });
  };

  useEffect(() => {
    if (auth.error) {
      openNotificationWithIcon('error', auth.error);
    }
    if (auth.registrationSuccess && auth.userRole && auth.isAuthenticated) {
      openNotificationWithIcon('success', 'Registered successfully.');
      navigate(`/${auth.userRole}`);
    }
    // eslint-disable-next-line
  }, [auth.isAuthenticated])

  const onFinish = (values) => {
    const data = {
      role: values.role,
      email: values.email,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    }
    dispatch(signupAsync(data));
  };

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );

  const [autoCompleteResult] = useState([]);
  autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const isLoading = auth.isLogging || auth.isRegistering;

  return (
    <>
      <Row justify="center" style={{ height: "100vh", backgroundColor: "#001529" }} align="middle">
        <Card style={{ width: 500, backgroundColor: "#e7e6f0" }} bordered={true} className="box-shadow">
          <Title level={2} style={{ textAlign: "center" }}>
            Register
          </Title>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            size={"large"}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                {
                  type: "email",
                  message: "Invalid Email address",
                },
                {
                  required: true,
                  message: "Please input a valid Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/*<Form.Item*/}
            {/*  name="phone"*/}
            {/*  label="Phone Number"*/}
            {/*  rules={[*/}
            {/*    { required: true, message: "Please input your phone number!" },*/}
            {/*  ]}*/}
            {/*>*/}
            {/*  <Input addonBefore={prefixSelector} style={{ width: "100%" }} />*/}
            {/*</Form.Item>*/}

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="select user role">
                <Option value="BUYER">Buyer</Option>
                <Option value="SELLER">Seller</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" block loading={isLoading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </>
  );
}

export default Register;
