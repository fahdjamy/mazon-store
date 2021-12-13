import React from "react";
import { Button } from "antd";
import { Checkbox, Row, Col, Card } from "antd";

export default function OrderStatus() {


  function onChange(checkedValues) {
  }
  return (
    <div>
      <Row>
        <Col span={10}>
          <Card title="Order Info">
            <Card type="inner" title="Order Id ">
              Inner Card content
            </Card>
          </Card>
        </Col>
        <Col span={2}></Col>
        <Col span={12}>
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Checkbox value="A">Shipped</Checkbox>
            <Checkbox value="A">On the way</Checkbox>
            <Checkbox value="A">Delivered</Checkbox>
          </Checkbox.Group>

          <Button style={{ marginTop: "10px" }} type="danger">
            Cancel Order
          </Button>
        </Col>
      </Row>

    </div>
  );
}
