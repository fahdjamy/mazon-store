import React, { useEffect } from "react";
import { Typography, Avatar, Card } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getSellersAsync } from "../../../store/actions/auth/user";

const { Title } = Typography;
const { Meta } = Card;

function ApprovedSeller(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSellersAsync());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // eslint-disable-next-line array-callback-return
  const sellerList = user.sellers.map((s) => {
    if (s.approved) {
      return (
        <div key={s.id}>
          <Card style={{ width: 600 }}>
            <Meta
              avatar={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />}
              title={s.username}
              description={s.email}
            />
          </Card>
        </div>
      );
    }

  });

  return (
    <div>
    {sellerList}
    </div>
  );
}

export default ApprovedSeller;
