import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync, updateOrderAsync } from "../../../store/actions/order";
import { getLoggedInUserDetailsAsync } from "../../../store/actions/auth/user";
const { Option } = Select;

function Order() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  let orders = useSelector((state) => state.orders.orders);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentOrder, setCurrentOrder] = useState({});

  const showModal = (newOrder) => {
    setCurrentOrder(newOrder);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getLoggedInUserDetailsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.userData?.id) {
      dispatch(getOrdersAsync(user.userData.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userData]);

  function handleStatusChange(value) {
    setCurrentOrder({ ...currentOrder, status: value });
  }

  const handleOk = () => {
    dispatch(
      updateOrderAsync(user.userData.id, currentOrder.id, {
        status: currentOrder?.status,
      })
    );
    setIsModalVisible(false);
  };

  const ordersList = orders.map((o, index) => (
    <Card
      title={o.product.name}
      style={{ width: 600, marginBottom: "20px" }}
      key={index}
    >
      <p>Price: ${o.product.price}</p>
      <p>{o.product.description}</p>
      <p>Status: {o.status}</p>
      <Button type="primary" onClick={() => showModal(o)}>
        Change Order Status
      </Button>
    </Card>
  ));

  return (
    <>
      {ordersList}
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        visible={isModalVisible}
        title="Update Order Status"
      >
        <Select
          style={{ width: 120 }}
          onChange={handleStatusChange}
          defaultValue={currentOrder?.status || "NOT_SHIPPED"}
        >
          <Option value="SHIPPED">shipped</Option>
          <Option value="DELIVERED">delivered</Option>
          <Option value="CANCELLED">cancelled</Option>
          <Option value="NOT_SHIPPED">not shipped</Option>
        </Select>

        <br />
      </Modal>
    </>
  );
}

export default Order;
