import React from "react";
import { Steps, Row, Card, Col, Button } from "antd";
const { Step } = Steps;
const { Meta } = Card;

function Order() {
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
        </Col>
      </Row>
    </div>
  );
}

export default Order;
