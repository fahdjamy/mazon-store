import React, { useEffect } from "react";
import { Card, Button, Row, Col, notification, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync } from "../../../store/actions/product/product";
import { addProductToCartAsync, getCartAsync } from "../../../store/actions/cart/cart";
const { Meta } = Card;

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const cart = useSelector(state => state.cart.cart)

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Item added To Cart',
    });
  };

  useEffect(() => {
    dispatch(fetchProductAsync());
    dispatch(getCartAsync())
    // eslint-disable-next-line
  }, []);

  const addToCart = (product) => {
    dispatch(addProductToCartAsync(cart.id, product.id));
    openNotificationWithIcon('success');
  }

  // eslint-disable-next-line array-callback-return
  const productList = products.map((p) => {
    if (!p.isPurchased) {
      return (
          <Card
            hoverable
            style={{ width: "300px" }}
            className="cs-card"
            key={p.id}
            cover={<img alt="example" src={p.imageCover} />}
          >
            <Meta title={p.name} description={`$${p.price}`} />
            <br />
            <Button type="primary" onClick={() => addToCart(p)}>
              Add <PlusOutlined />
            </Button>
          </Card>
        // <Col key={p.id}>
        // </Col>
      )
    }
  });

  return (
    <div>
      {products.length > 0 ? <Row gutter={[16, 32]}>{productList}</Row> : <Spin />}
    </div>
  );
}

export default Product;
