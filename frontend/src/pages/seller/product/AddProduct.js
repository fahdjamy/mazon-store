import React from "react";

import { Form, Input, InputNumber, Button, Col, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function AddProduct() {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Row>
      <Col span={12}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["product", "name"]}
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["product", "price"]}
            label="Price"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={["product", "description"]}
            label="description"
            rules={[{ required: true, type: "number" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["image", "url"]}
            label="Image URl"
            rules={[{ required: true, type: "number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default AddProduct;
