import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Form, Input, InputNumber, Button, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  addProductAsync,
  deleteProductAsync,
  editProductAsync,
  fetchProductAsync,
} from "../../../store/actions/product/product";

const style = { padding: "8px 0" };

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Meta } = Card;

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

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProductAsync());
    // eslint-disable-next-line
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (currentProduct) => {
    setIsModalVisible(true);

    setModalData(() => {
      return currentProduct;
    });
  };

  const add = () => {
    setAddModalVisible(true);
  };

  const deleteProductHandler = (currentProduct) => {
    dispatch(deleteProductAsync(currentProduct.id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAddModalVisible(false);
    setModalData({});
  };

  const onFinish = (values) => {
    dispatch(editProductAsync(values.id, values));
    setModalData("");
    setIsModalVisible(false);
  };

  const onAdd = (values) => {
    const data = { ...values, isPurchased: false };

    dispatch(addProductAsync(data));
    setAddModalVisible(false);
  };

  const productList = products.map((p) => {
    return (
      <Col className="gutter-row" key={p.id} span={6}>
        <div style={style}>
          {" "}
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt="example" src={p.imageCover} />}
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => showModal(p)}
                hidden={p.isPurchased}
              />,
              <DeleteOutlined
                onClick={() => deleteProductHandler(p)}
                hidden={p.isPurchased}
              />,
            ]}
            className="cs-card"
          >
            <Meta title={p.name} description={`$${p.price}`} />
            <Meta description={p.description} />
            <br />
            {p.isPurchased && (
              <Meta description={"SOLD"} style={{ color: "green" }} />
            )}
          </Card>
        </div>
      </Col>
    );
  });
  return (
    <>
      <Row justify="end">

          <Button
            type="primary"
            onClick={() => add()}
            style={{ marginBottom: "20px" }}
          >
            Add Product
          </Button>

      </Row>
      <Row gutter={16}>{productList}</Row>

      <Modal
        title="Edit Product Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        getContainer={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          initialValues={{
            id: modalData.id,
            name: modalData.name,
            price: modalData.price,
            imageCover: modalData.imageCover,
            description: modalData.description,
          }}
          onFinish={onFinish}
        >
          <Form.Item name={"id"} label="Product Id">
            <Input disabled />
          </Form.Item>
          <Form.Item name={"name"} label="Product Name">
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Product "
        visible={addModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        getContainer={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onAdd}
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
      </Modal>
    </>
  );
}

export default Product;
