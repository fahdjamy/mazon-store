import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

function Product() {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://cdn.pocket-lint.com/r/s/970x/assets/images/155087-laptops-review-microsoft-surface-laptop-go-review-image1-6ezitk9ymj.jpg"
        />
      }
      actions={[
        // <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        // <EllipsisOutlined key="ellipsis" />,
        <DeleteOutlined />,
      ]}
    >
      <Meta
        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Surface Laptop "
        description="In  a perfect condition"
      />
    </Card>
  );
}

export default Product;
