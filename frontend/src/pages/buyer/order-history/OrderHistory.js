import React from "react";
import { List, Avatar } from "antd";

const data = [
  {
    title: "Winter Jacket",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

function OrderHistory() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Winter/Winter%20jackets/REI%20Co-op%20Stormhenge%20Down%20Hybrid%20winter%20jacket.jpeg" />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
}

export default OrderHistory;
