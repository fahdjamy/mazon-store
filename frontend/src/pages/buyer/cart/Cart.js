import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Spin,
  Card,
  Input,
  Button,
  notification,
  InputNumber,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartAsync,
  removeProductFromCartAsync,
} from "../../../store/actions/cart/cart";
import { Modal } from "antd";
import { Form } from 'antd';
import { placeOrderAsync } from "../../../store/actions/order";
import { makePaymentAsync } from "../../../store/actions/payment";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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
  cvv: {
    // eslint-disable-next-line
    range: "${label} must be between ${min} and ${max} digits",
  },
};

export default function Cart() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Payment Successful",
    });
  };

  const remove = (item) => {
    dispatch(removeProductFromCartAsync(item.id, cart.cart.id));
  };

  // let navigate = useNavigate();
  // const checkoutHandler = (id) => {
  //   navigate(`/buyer/make-payment/${id}`);
  // };

  const showModal = (id) => {
    setIsModalVisible(true);
    setProductId(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    let expiryDate = `${values.month}${values.year}`;
    values = {
      cardNumber: values.cardNumber,
      cvv: values.cvv,
      carNumber: values.carNumber,
      expiryDate: expiryDate,
    };
    setIsModalVisible(false);

    dispatch(placeOrderAsync(productId));
    dispatch(makePaymentAsync(productId, values));
    dispatch(removeProductFromCartAsync(productId, cart.cart.id));

    openNotificationWithIcon("success");
    // navigate("/buyer/orders");
  };

  let cartList = [];
  if (cart?.isLoading === false) {
    const products = cart.cart.products;
    cartList = products?.map((i, index) => {
      return (
        <Row style={{ marginBottom: "16px" }} className="cart-pdt" key={index}>
          <Col className="gutter-row" span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={i.imageCover} />}
            >
              <Meta title={i.name} description={`$${i.price}`} />
              <Meta description={i.description} />
            </Card>
          </Col>
          <Col span={8}></Col>
          <Col className="gutter-row" span={8}>
            <Button
              type="primary"
              style={{ marginTop: "50px" }}
              // onClick={() => checkoutHandler(i.id)}
              onClick={() => showModal(i.id)}
            >
              Place Order{" "}
            </Button>
            <br />
            <br />
            <Button type="secondary" onClick={() => remove(i)}>
              Remove From cart{" "}
            </Button>
          </Col>
        </Row>
      );
    });
  } else {
    cartList = <Spin />;
  }

  return (
    <>
    {Array.isArray(cartList) && !cartList.length ? <h2>Cart is empty!!</h2> : cartList}
    

      <Modal
        title="Place Order"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        getContainer={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"cardNumber"}
            label="Card Number"
            rules={[{ required: true }]}
          >
            <Input />
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

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
