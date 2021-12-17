import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAsync,
  getLoggedInUserDetailsAsync,
} from "../../../store/actions/auth/user";
import { Form, Input, Button, notification } from "antd";
import { useState } from "react";
import { Modal } from "antd";
const { Meta } = Card;

function Profile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [billing, setBilling] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  useEffect(() => {
    dispatch(getLoggedInUserDetailsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.updateSuccess) {
      setIsModalVisible(false);
      openNotificationWithIcon("success", "updated successfully.");
    }
  }, [user]);

  const onFinish = (values) => {
    if (billing && user.userData?.id) {
      dispatch(
        updateUserAsync(user.userData.id, {
          ...user.userData,
          billingAddress: {
            street: values.street,
            zip: values.zip,
            state: values.state,
            city: values.city,
          },
        })
      );
    } else {
      dispatch(
        updateUserAsync(user.userData.id, {
          ...user.userData,
          shippingAddress: {
            street: values.street,
            zip: values.zip,
            state: values.state,
            city: values.city,
          },
        })
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateBilling = () => {
    setBilling(true);
    setIsModalVisible(true);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Card
            style={{ width: 200 }}
            cover={
              <img
                alt="example"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              />
            }
          >
            <Meta
              title={`${user.userData?.username}`}
              description={`${user.userData?.email}`}
            />
            <Meta description={`Points: ${user.userData?.points}`} />
          </Card>
        </Col>

        <Col className="gutter-row" span={6}>
          <Card
            title="Billing Address"

            style={{ width: 300 }}
          >
            {user.userData?.billingAddress && <>
              <p>State: {user.userData.billingAddress.state}</p>
              <p>City:{user.userData.billingAddress.city}</p>
              <p>Street:{user.userData.billingAddress.street}</p>
              <p>Zip:{user.userData.billingAddress.zip}</p>
            </>}
          </Card>
        </Col>

        <Col className="gutter-row" span={6}>
          <Card
            title="Shipping Address"

            style={{ width: 300 }}
          >
            {user.userData?.shippingAddress && <>
              <p>State: {user.userData?.shippingAddress.state}</p>
              <p>City:{user.userData?.shippingAddress.city}</p>
              <p>Street:{user.userData?.shippingAddress.street}</p>
              <p>Zip:{user.userData?.shippingAddress.zip}</p>
            </>}
          </Card>
        </Col>
        <Col className="gutter-row" span={4}></Col>
      </Row>
      <Row style={{ marginTop: "30px" }} gutter={16}>
        <Button type="primary" onClick={showModal}>
          Update Shipping Address
        </Button>
        <br />
        &nbsp; &nbsp;
        <Button type="primary" onClick={updateBilling}>
          Update Billing Address
        </Button>
        <Modal
          title="Update Address"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please input your state!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please input your street!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="zip"
              name="zip"
              rules={[{ required: true, message: "Please input your zip!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={user.isUpdatingUser}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </div>
  );
}

export default Profile;
