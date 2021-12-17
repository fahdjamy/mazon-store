import React, { useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Card,
  Input,
  Button,
  InputNumber,
  notification,
} from "antd";
import { makePaymentAsync } from "../../../store/actions/payment";
import { fetchProductAsync } from "../../../store/actions/product/product";
import { useNavigate, useParams } from "react-router-dom";
import { placeOrderAsync } from "../../../store/actions/order";
import { useSelector, useDispatch } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  // eslint-disable-next-line
  required: "${label} is required!",
  types: {
    // eslint-disable-next-line
    email: "${label} is not a valid email!",
    // eslint-disable-next-line
    number: "${label} is not a valid number!",
  },
  cvv: {
    // eslint-disable-next-line
    range: "${label} must be between ${min} and ${max} digits",
  },
  cardNumber: {
    // eslint-disable-next-line
    range: "${label} must be ${min} digits",
  },
};

export default function Payment() {
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  useSelector(state => state.payment);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Payment Successful",
    });
  };

  useEffect(() => {
    dispatch(fetchProductAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    let expiryDate = `${values.month}${values.year}`;
    values = {
      cardNumber: values.cardNumber,
      cvv: values.cvv,
      carNumber: values.carNumber,
      expiryDate: expiryDate,
    };

    dispatch(placeOrderAsync(params.productId));
    dispatch(makePaymentAsync(params.productId, values));
    openNotificationWithIcon("success");
    navigate("/buyer/orders");
  };

  return (
    <div>
      <Row>
        <Card title="Payment details" style={{ width: 900 }}>
          <Col span={12}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[{ required: true, min:16, max:16 }]}
              >
                <Input  />
              </Form.Item>
              <Form.Item
                name={"cvv"}
                label="Cvv"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={100} max={999} />
              </Form.Item>
              <Form.Item
                label="Expiry Date"
                style={{ marginBottom: 0 }}
                rules={[{ required: true }]}
              >
                <Form.Item
                  name="month"
                  rules={[{ required: true, max: 2, min: 2 }]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input placeholder="Month" />
                </Form.Item>
                <Form.Item
                  name="year"
                  rules={[{ required: true, max: 2, min: 2 }]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <Input placeholder="Year" />
                </Form.Item>
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Card>
      </Row>
    </div>
  );
}
