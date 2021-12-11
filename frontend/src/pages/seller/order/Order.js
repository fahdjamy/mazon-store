import React from "react";
import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    orderId: "John",
    productName: "Brown",
    status: "shipped",
    action: "s",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

function Order() {
  return (
    <div>
      <Table dataSource={data}>
        <Column title="Order Id" dataIndex="orderId" key="orderId" />
        <Column
          title="Product Name"
          dataIndex="productName"
          key="productName"
        />

        <Column title="Status" dataIndex="status" key="status" />

        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to="/seller/order-status">View Order</Link>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Order;
