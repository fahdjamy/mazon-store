import React from "react";
import { Form, Input, InputNumber, Button, Row, Col } from "antd";

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
  number: {
    // eslint-disable-next-line
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function Payment() {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["cardNumber", "cardNumber"]}
              label="Card Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["cvv", "cvv"]}
              label="Cvv"
              rules={[{ type: "number", min: 3, max: 3, required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="Expiry Date" style={{ marginBottom: 0 }}>
              <Form.Item
                name="month"
                rules={[{ type: "number", min: 2, max: 2, required: true }]}
                style={{
                  display: "inline-block",

                  margin: "0 8px",
                }}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="year"
                rules={[{ type: "number", min: 2, max: 2, required: true }]}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                <InputNumber />
              </Form.Item>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
