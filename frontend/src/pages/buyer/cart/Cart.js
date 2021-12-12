import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Col, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartAsync,
  removeProductFromCartAsync,
} from "../../../store/actions/cart/cart";

const { Meta } = Card;

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    dispatch(getCartAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remove = (item) => {
    dispatch(removeProductFromCartAsync(item.id, cart.cart.id));
  };

  let navigate = useNavigate();
  const checkoutHandler = (id) => {
    navigate(`/buyer/make-payment/${id}`);
  };



  let cartList;
  if (cart?.isLoading === false) {
    const products = cart.cart.products;
    console.log("this", products);
    cartList = products.map((i, index) => {
      return (
        <Row style={{ marginBottom: "16px" }} className="cart-pdt" key={index} >
          <Col className="gutter-row" span={8}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={i.imageCover} />}
            >
              <Meta title={i.name} description={`$${i.price}`} />
              <Meta description={i.description} />
            </Card>
          </Col>
          <Col span={8}></Col>
          <Col className="gutter-row" span={8}>
            <Button type="primary" onClick={()=>checkoutHandler(i.id)}>
              Checkout Product{" "}
            </Button>
            <br />
            <br />
            <Button type="secondary" onClick={() => remove(i)}>
              Remove From cart{" "}
            </Button>
          </Col>
        </Row>
      );
    });
  } else {
    cartList = <Spin />;
  }

  return <>{cartList}</>;
}
