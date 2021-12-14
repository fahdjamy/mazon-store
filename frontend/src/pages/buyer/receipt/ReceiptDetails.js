import React from "react";
import {
  Row,
  Col,
  Card,
  Space,
  Statistic,
  Typography,
} from "antd";
import moment from 'moment';
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
export const ReceiptDetails = React.forwardRef(({
  order,
  buyer
}, ref) => {
  const user = useSelector(state => state.auth)
  return (
    <div ref={ref}>
      <Row
        style={{
          marginLeft: "10px",
          marginTop: "15px",
        }}
      >
        <Title level={5}>Created At: {moment(new Date(
          order?.createdAt
        )).format("MM/DD/YY HH:mm:ss")}</Title>
      </Row>
      <Card
        style={{
          paddingBottom: "8px",
          margin: "4px",
          flexWrap: "wrap",
          textAlign: "center",
          borderRadius: "20px 20px 10px 10px",
        }}
      >
        <Row>
          <Col span={3}>
            <Statistic title="ORDER ID" value={`#${order.id}`} />
          </Col>
          <Col span={5}>
            <Title level={4} type="secondary">
              SHIPPING ADDRESS
            </Title>
            <Space direction="vertical">
              <Text>{buyer.username}</Text>

           
              <Text>{buyer.shippingAddress?.city} {buyer.shippingAddress?.zip}</Text>
              {/* <Text>United States</Text> */}
            </Space>
          </Col>
          <Col span={6}>
            <Title level={4} type="secondary">
              BILLING ADDRESS
            </Title>
            <Space direction="vertical">
            <Text>{buyer.username}</Text>

              {/* <Text>1000 N 4TH ST MR # 635</Text> */}
              <Text>{buyer.billingAddress?.city}{buyer.billingAddress?.state} {buyer.billingAddress?.zip}</Text>
              {/* <Text>United States</Text> */}
            </Space>
          </Col>
          <Col span={4}>
            <Statistic title="PAYMENT MODE" value={`VISA`} precision={2} />
          </Col>
          <Col span={4}>
            <Statistic title="ORDER AMOUNT" value={`$${order.product.price}`} />
          </Col>
          <Col span={2}>
            <Statistic title="STATUS" value={order.status} />
            {/* <Button onClick={()=>props.clicked()}>print</Button> */}
          </Col>
        </Row>
      </Card>
    </div>
  );
});
