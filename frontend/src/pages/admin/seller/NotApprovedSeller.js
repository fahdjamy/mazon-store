import React, { useEffect } from "react";
import {
  List,
  Typography,
  Button,
  Card,
  Avatar,
  notification,
  Row,
  Col,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  approveSellerAsync,
  getSellersAsync,
} from "../../../store/actions/auth/user";
import { approveReviewAsync } from "../../../store/actions/review";

const { Meta } = Card;

const { Title } = Typography;



function NotApprovedSeller() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const openNotification = () => {
    notification.open({
      message: 'Seller Approved',
    });
  };



  const approveHandler = (sellerId) => {
    dispatch(approveSellerAsync(sellerId));
  };

  useEffect(() => {
    dispatch(getSellersAsync());
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line array-callback-return
  const sellerList = user.sellers.map((s, index) => {
    if (!s.approved) {
      return (
        <div key={index}>
          <Row  justify="center">
      
              <Card style={{ width: 600 }} key={s.id}>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={s.username}
                  description={s.email}
                />
                <Button
                  style={{marginTop:"30px"}} type="primary"
                  onClick={() => approveHandler(s.id)}
                  loading={user.isApprovingSeller}
                >
                {user.isApprovingSeller ? "approving" :"approve"}
              </Button>
              </Card>
          </Row>
        </div>
      );
    }
    
  });


  return <div>
    {user.isApprovingSeller ?  <Spin/> : sellerList }
    </div>;
}

export default NotApprovedSeller;
