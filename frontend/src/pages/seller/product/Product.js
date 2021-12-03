import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Form, Input, InputNumber, Button, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  addProduct,
  editProduct,
  deleteProduct,
} from "../../../store/reducers/productSlice";
import { fetchProductAsync } from "../../../store/actions/product/product";

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

function Product() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductAsync());
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const products = useSelector((state) => state.product.products);

  console.log("gotFromstore", products);

  console.log(products);

  const [modalData, setModalData] = useState({});

  const showModal = (currentProduct) => {
    setIsModalVisible(true);
    setModalData(() => {
      return currentProduct;
    });
  };

  const deleteProductHandler = (currentProduct) => {
    console.log(currentProduct.id);
    dispatch(deleteProduct(currentProduct.id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalData({});
  };

  const onFinish = (values) => {
    console.log(values.name);
    dispatch(editProduct(values));
    setModalData("");
    setIsModalVisible(false);
  };

  const productList = products.map((p) => (
    <Col className="gutter-row" key={p.id} span={6}>
      <div style={style}>
        {" "}
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src={p.imageCover} />}
          actions={[
            <EditOutlined key="edit" onClick={() => showModal(p)} />,
            <DeleteOutlined onClick={() => deleteProductHandler(p)} />,
          ]}
        >
          <Meta title={p.name} description={p.description} />
        </Card>
      </div>
    </Col>
  ));
  return (
    <>
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
            url: modalData.url,
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
            name={"url"}
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
    </>
  );
}

export default Product;
