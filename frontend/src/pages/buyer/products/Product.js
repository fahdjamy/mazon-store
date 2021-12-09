import React from "react";
import { Card, Avatar, Button } from "antd";
import { Row, Col } from "antd";
import "./Product.css";

import {
  EditOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
function Product() {
  const divs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <Row gutter={[16, 32]}>
        {divs.map((d) => (
          <Col span={6}>
            <Card
              // className="box-shadow"
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Winter/Winter%20jackets/REI%20Co-op%20Stormhenge%20Down%20Hybrid%20winter%20jacket.jpeg"
                />
              }
            >
              <Meta title="Winter Jacket" description="Best Seller" />
              <br />
              <Button type="primary">
                Add <PlusOutlined />
              </Button>
            </Card>

            {/* <Card
              className="box-shadow"
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <ShoppingCartOutlined />,
              ]}
            >
              <Meta
                // avatar={
                //   <Avatar src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg" />
                // }
                title="Superstar shoess"
                description="This is the description"
              />
            </Card> */}
          </Col>
        ))}
      </Row>
      <br />
    </div>
  );
}

export default Product;
