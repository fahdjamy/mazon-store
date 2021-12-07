import React from "react";
import { Card, Col, Row, Typography } from "antd";
const { Title } = Typography;

function ApprovedReviews() {
  return (
    <div className="site-card-wrapper">
      <Title level={2}>Approved Reviews</Title>
      <Row gutter={10}>
        <Col span={5}>
          <Card title="John Wick" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Olivia " bordered={true}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ApprovedReviews;
