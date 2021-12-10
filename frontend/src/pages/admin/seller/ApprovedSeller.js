import React, { useState } from "react";
import { List, Typography, Button, Avatar, Card, Modal } from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;
const { Meta } = Card;

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
function ApprovedSeller() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <List
        size="large"
        header={
          <div>
            <Title level={2}> Approved Sellers</Title>
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
            <Button type="danger" onClick={showModal}>
              Decline
            </Button>
          </List.Item>
        )}
      />
      <Modal
        title="Decline Seller"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to decline seller?</p>
      </Modal>
    </div>
  );
}

export default ApprovedSeller;
