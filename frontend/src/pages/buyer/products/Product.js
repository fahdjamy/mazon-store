import React, { useEffect } from "react";
import { Card, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync } from "../../../store/actions/product/product";
const { Meta } = Card;

function Product() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductAsync());
  });

  const products = useSelector((state) => state.product.products);

  const productList = products.map((p) => (
    <Col span={6} key={p.id}>
      <Card
        hoverable
        style={{ width: "300px" }}
        className="cs-card"
        cover={<img alt="example" src={p.imageCover} />}
      >
        <Meta title={p.name} price={p.price} />
        <br />
        <Button type="primary">
          Add <PlusOutlined />
        </Button>
      </Card>
    </Col>
  ));

  return (
    <div>
      {products.length > 0 && <Row gutter={[16, 32]}>{productList}</Row>}
      <br />
    </div>
  );
}

export default Product;
