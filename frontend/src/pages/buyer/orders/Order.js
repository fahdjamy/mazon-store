import React, { useState } from "react";
import { Steps, Row, Card, Col, Button } from "antd";
import { Form, Input } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Step } = Steps;
const { Meta } = Card;

function Order() {
  const [showReview, setShowReview] = useState(false);

  const onFinish = (values) => {
    console.log(values);
  };

  const openReview = () => {
    setShowReview(true);
  };

  return (
    <div>
      <Row>
        <Col className="gutter-row" span={8}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Winter/Winter%20jackets/REI%20Co-op%20Stormhenge%20Down%20Hybrid%20winter%20jacket.jpeg"
              />
            }
          >
            <Meta title="Winter Jacket" description="Best Seller" />
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Steps direction="vertical" size="small" current={0}>
            <Step title="Shipped" description="Your order has been shipped." />
            <Step title="On the way" description="Your order is on the way" />
            <Step title="Delivered" description="Arriving on December 25" />
          </Steps>
        </Col>
        <Col className="gutter-row" span={8}>
          <Button type="primary">Cancel Order </Button>
          <br />
          <br />
          <Button type="primary" onClick={openReview}>
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
}

export default Order;
