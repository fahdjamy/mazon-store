import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Col, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCartAsync, removeProductFromCartAsync } from "../../../store/actions/cart/cart";
import { removeProductFromCart } from "../../../store/reducers/cartSlice";

const { Meta } = Card;

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartAsync());
  }, []);

  console.log(cart);

  const remove = (item) =>{
    dispatch(removeProductFromCartAsync( item.id,cart.cart.id))
  }

  let navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/buyer/make-payment");
  };

  let cartList;
  if (cart.isLoading === false) {
    const products = cart.cart.products;
    cartList = products.map((i) => {
      return (<Row style={{marginBottom:"16px"}}  key={i.key}>
        <Col className="gutter-row" span={8}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={i.imageCover} />}
          >
            <Meta title={i.name} description={`$${i.price}`} />
            <Meta  description={i.description} />
          </Card>
        </Col>
        <Col className="gutter-row" span={8}></Col>
        <Col className="gutter-row" span={8}>
          <Button type="primary" onClick={checkoutHandler}>
            Checkout Product{" "}
          </Button>
          <br />
          <br />
          <Button type="secondary" onClick={()=>remove(i)}>Remove From cart </Button>
        </Col>
      </Row>);
    });
  } else {
    cartList = <Spin />
  }

  return <>
    {cartList}
    </>;
}
