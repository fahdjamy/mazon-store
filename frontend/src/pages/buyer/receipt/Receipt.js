import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { ReceiptDetails } from "./ReceiptDetails";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { getLoggedInUserDetailsAsync } from "../../../store/actions/auth";

const OrderReceipts = () => {
  const user = useSelector(state => state.auth)
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUserDetailsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {orders?.orders?.map((order, index) => (
        <div key={String(index)}>
          <Receipt order={order} buyer={user?.userData} />
        </div>
      ))}
    </div>
  )
}

const Receipt = ({ order, buyer }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{
      margin: "30px"
    }}>
      <ReceiptDetails
        order={order}
        buyer={buyer}
        ref={componentRef}
      />
      <Button
        style={{ margin: "10px 15px 10px 0" }}
        type="primary"
        onClick={handlePrint}
        block
        ghost
      >Print</Button>
    </div>
  );
};

export default OrderReceipts;
