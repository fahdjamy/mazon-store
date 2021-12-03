import React from "react";
import { Descriptions, Button } from "antd";
import { Checkbox, Row, Col } from "antd";

export default function OrderStatus() {
  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }
  return (
    <div>
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Row>
              <Col span={8}>
                <Checkbox value="A">A</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="B">B</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="C">C</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="D">D</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="E">E</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>
      {/* <Descriptions title="Order Info">
        <Descriptions.Item label="Order Id">Winter Jacket </Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>

      <Button type="danger">Cancel</Button> */}
    </div>
  );
}
