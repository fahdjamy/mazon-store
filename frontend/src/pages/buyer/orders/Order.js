import React, { useState, useEffect } from "react";
import { Steps, Row, Card, Col, Button, Typography } from "antd";
import { Form, Input, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrderAsync, getOrdersAsync } from "../../../store/actions/order";
import { getLoggedInUserDetailsAsync } from "../../../store/actions/auth/user";
import { addReviewAsync } from "../../../store/actions/product/review";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Step } = Steps;
const { Meta } = Card;

function Order() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth);

  const [myProductId, setmyProductId] = useState("");
  const [clicked, setIsClicked] = useState(false);
  let status = -1;

  useEffect(() => {
    dispatch(getLoggedInUserDetailsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.userData?.id) {
      dispatch(getOrdersAsync(user.userData.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userData, clicked]);
  const [showReview, setShowReview] = useState(-1);

  useEffect(() => {
    if (order.cancelOrderErrorMsg) {
      // dispatch(getOrdersAsync(user.userData.id));
      openNotificationWithIcon("error", order.cancelOrderErrorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.cancelOrderErrorMsg]);

  const orders = order.orders;

  const openReview = (pdtIndex, productId) => {
    setShowReview(pdtIndex);
    setmyProductId(productId);
  };

  const onFinish = (values) => {
    dispatch(addReviewAsync(myProductId, values));
    openNotificationWithIcon("success", "Review added");
  };

  const cancelOrder = (id) => {
    dispatch(cancelOrderAsync(id));
    setIsClicked(true);
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: type,
      description: msg,
    });
  };

  const orderList = orders.map((o, pdtIndex) => {
    if (o.status === "SHIPPED") {
      status = 0;
    } else if (o.status === "DELIVERED") {
      status = 2;
    } else if (o.status === "NOT_SHIPPED") {
      status = -1;
    }

    return (
      <Card key={o.product.id}>
        <div>
          <Row>
            <Col className="gutter-row" span={8}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={o.product.imageCover} />}
              >
                <Meta
                  title={o.product.name}
                  description={`$${o.product.price}`}
                />
                <Meta description={o.product.description} />
              </Card>
            </Col>
            <Col className="gutter-row" span={8}>
              {o.status === "CANCELLED" ? (
                <Title type="danger" level={3}>
                  CANCELLED
                </Title>
              ) : (
                <Steps direction="vertical" size="small" current={status}>
                  <Step
                    title="Shipped"
                  />
                  <Step
                    title="On the way"
                  />
                  <Step
                    title="Delivered"
                  />
                </Steps>
              )}
            </Col>
            <Col className="gutter-row" span={8}>
              {o.status === "NOT_SHIPPED" && (
                <Button type="primary" onClick={() => cancelOrder(o.id)}>
                  Cancel Order{" "}
                </Button>
              )}

              <br />
              <br />
              <Button
                type="primary"
                onClick={() => openReview(pdtIndex, o.product.id)}
              >
                Add a Review
              </Button>
            </Col>
          </Row>
          <Row gutter={[0, 24]}>
            <Col span={8}>
              {showReview !== -1 && showReview === pdtIndex && (
                <Form
                  style={{ marginTop: "50px" }}
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                >
                  <Form.Item name={"content"} label="Add a review">
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
      </Card>
    );
  });

  return (
    <>{orderList.length === 0 ? <h2>No orders made yet!!</h2> : orderList}</>
  );
}

export default Order;
