import React from "react";
import { List, Typography, Divider } from "antd";

const { Title } = Typography;
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

function NotApprovedSeller() {
  return (
    <div>
      <List
        size="large"
        header={
          <div>
            <Title level={2}> Not Approved Sellers</Title>
          </div>
        }
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

export default NotApprovedSeller;
