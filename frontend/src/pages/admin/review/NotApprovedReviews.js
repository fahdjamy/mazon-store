import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { approveReviewAsync, getAllReviewsAsync } from "../../../store/actions/review";
import { Row, Button } from "antd";
import { Card } from "antd";

const { Meta } = Card;

function NotApprovedReviews() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reviews = useSelector((state) => state.reviews);

  const approveHandler = (id) => {
    dispatch(approveReviewAsync(id))
  }

  // eslint-disable-next-line array-callback-return
  const list = reviews.reviews.map((r, index) => {
    if (r.approved !== true) {
      return (
        <div key={index}>
          <Row justify="center">
            <Card style={{ width: 600 }}>
              <Meta description={r.content} />
              <Button
                type="primary"
                style={{ marginTop: "30px" }}
                onClick={() => approveHandler(r.id)}
                loading={reviews.fetchingReviews}
              >
                {reviews.fetchingReviews ? "approving" : "approve"}
              </Button>
            </Card>
          </Row>
        </div>
      );
    }
  });

  return <div>{list}</div>;
}

export default NotApprovedReviews;
