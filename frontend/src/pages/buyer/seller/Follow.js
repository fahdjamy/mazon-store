import React, { useEffect } from "react";
import { Button, List, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDetailsAsync } from "../../../store/actions/auth";
import {
  getSellersAsync,
  sendFollowReqAsync,
  sendUnFollowReqAsync,
} from "../../../store/actions/auth/user";

function Follow() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const buyer = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSellersAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (buyer.unFollowReqSuccess || buyer.followReqSuccess) {
      dispatch(getSellersAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyer]);

  const follow = (sellerId) => {
    dispatch(sendFollowReqAsync(sellerId));
  };
  const unfollow = (sellerId) => {
    dispatch(sendUnFollowReqAsync(sellerId));
  };

  return (
    <>
      <List
        header={<div>Sellers</div>}
        bordered
        dataSource={user.sellers}
        renderItem={(s) => (
          <List.Item>
            <Typography.Text>{s.username}</Typography.Text>
            <br />

            {s.followed ? (
              <Button
                style={{ float: "right", marginBottom: "10px" }}
                type="danger"
                ghost
                onClick={() => unfollow(s.id)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                style={{ float: "right", marginBottom: "10px" }}
                type="primary"
                ghost
                onClick={() => follow(s.id)}
              >
                follow
              </Button>
            )}
          </List.Item>
        )}
      />
    </>
  );
}

export default Follow;
