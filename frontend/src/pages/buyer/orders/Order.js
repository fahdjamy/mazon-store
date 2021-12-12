import React, { useState, useEffect } from "react";
import { Steps, Row, Card, Col, Button } from "antd";
import { Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrderAsync, getOrdersAsync } from "../../../store/actions/order";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Step } = Steps;
const { Meta } = Card;

function Order() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders);
  console.log(order);

  let status = -1;

  useEffect(() => {
    dispatch(getOrdersAsync(6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showReview, setShowReview] = useState(false);

  const orders = order.orders;

  const onFinish = (values) => {
    console.log(values);
  };

  const openReview = () => {
    setShowReview(true);
  };

  console.log(orders);

  const cancelOrder = (id) => {
    dispatch(cancelOrderAsync(id));
  };

  const orderList = orders.map((o, i) => {
    if (o.status === "SHIPPED") {
      status = 0;
    } else if (o.status === "DELIVERED") {
      status = 2;
    }

    return (
      <div key={o.product.id}>
        <Row>
          <Col className="gutter-row" span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={o.product.imageCover} />}
            >
              <Meta title={o.product.name} description={`$${o.product.price}`} />
              <Meta description={o.product.description} />
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Steps direction="vertical" size="small" current={status}>
              <Step
                title="Shipped"
                description="Your order has been shipped."
              />
              <Step title="On the way" description="Your order is on the way" />
              <Step title="Delivered" description="Arriving on December 25" />
            </Steps>
          </Col>
          <Col className="gutter-row" span={8}>
            <Button type="primary" onClick={() => cancelOrder(o.id)}>
              Cancel Order{" "}
            </Button>
            <br />
            <br />
            <Button type="primary" onClick={() => openReview()}>
              Add a Review
            </Button>
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col span={8}>
            {showReview && (
              <Form
                style={{ marginTop: "50px" }}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
              >
                <Form.Item name={["review", "review"]} label="Add a review">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </div>
    );
  });

  return <>{orderList}</>;
}

export default Order;
