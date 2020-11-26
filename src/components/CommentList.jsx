import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => {
          let rateVariant = "";

          if (comment.rate === 1) {
            return (rateVariant = "danger");
          } else if (comment.rate === 2) {
            return (rateVariant = "warning");
          } else if (comment.rate === 3) {
            return (rateVariant = "secondary");
          } else {
            return (rateVariant = "success");
          }

          return (
            <ListGroup key={comment._id}>
              <ListGroup.Item>
                <Badge pill variant={rateVariant} className="mr-2">
                  {comment.rate}
                </Badge>
                {comment.comment}
              </ListGroup.Item>
            </ListGroup>
          );
        })}
    </>
  );
};

export default CommentList;
