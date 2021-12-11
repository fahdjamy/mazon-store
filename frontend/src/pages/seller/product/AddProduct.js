import React from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../../../store/actions/product/product";

import { Form, Input, InputNumber, Button, Col, Row } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
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

function AddProduct() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    dispatch(addProductAsync(values));
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
            name={"name"}
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"price"}
            label="Price"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={"description"}
            label="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={"imageCover"}
            label="Image URl"
            rules={[{ required: true }]}
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
