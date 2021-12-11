import React from "react";
import {Card, Button, Row, Col} from "antd";
import {PlusOutlined} from "@ant-design/icons";
const {Meta} = Card;

function Product() {
  const divs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <Row gutter={[16, 32]}>
        {divs.map((d) => (
          <Col span={6} key={String(d)}>
            <Card
              hoverable
              style={{width: "300px"}}
              className="cs-card"
              cover={
                <img
                  alt="example"
                  src="https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Winter/Winter%20jackets/REI%20Co-op%20Stormhenge%20Down%20Hybrid%20winter%20jacket.jpeg"
                />
              }
            >
              <Meta title="Winter Jacket" description="Best Seller winter jacket on market right now"/>
              <br/>
              <Button type="primary">
                Add <PlusOutlined/>
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <br/>
    </div>
  );
}

export default Product;
