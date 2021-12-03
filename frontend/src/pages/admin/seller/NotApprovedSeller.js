import React from "react";
import {
  List,
  Typography,
  Row,
  Col,
  Button,
  Card,
  Avatar,
  notification,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const { Title } = Typography;
const data = [
  "James Bond",
  "John Wick ",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

function NotApprovedSeller() {
  const openNotification = () => {
    notification.open({
      message: "Seller Approved",
      description: "Seller has been succesfull approved.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  return (
    <div>
      <List
        size="large"
        header={
          <div>
            <Title level={2}> Not Approved Sellers</Title>
          </div>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card style={{ width: 600 }}>
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item}
                description="This is the description"
              />
            </Card>
            <Button type="primary" onClick={openNotification}>
              Approve
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
}

export default NotApprovedSeller;
