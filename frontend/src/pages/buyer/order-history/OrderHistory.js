import React from "react";
import { List, Avatar, Spin } from "antd";
import { useSelector } from "react-redux";



function OrderHistory() {
  const orders = useSelector(state => state.orders);

  return (<>
    {orders.orders.length > 0 ?  <List
      itemLayout="horizontal"
      dataSource={orders.orders}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={item.product.imageCover} />
            }
            title={item.product.name}
            description={item.product.description}
          />
        </List.Item>
      )}
    /> : <h2>No order history yet!!</h2>}
  </>)
  
   
  
}

export default OrderHistory;
