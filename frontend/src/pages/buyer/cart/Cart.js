import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Col, Button } from "antd";

const { Meta } = Card;

export default function Cart() {
  let navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/buyer/make-payment");
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
        <Col className="gutter-row" span={8}></Col>
        <Col className="gutter-row" span={8}>
          <Button type="primary" onClick={checkoutHandler}>
            Checkout Product{" "}
          </Button>
          <br />
          <br />
          <Button type="secondary">Remove From cart </Button>
        </Col>
      </Row>
    </div>
  );
}
