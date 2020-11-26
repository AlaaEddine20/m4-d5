import React, { Component } from "react";
import { ListGroup, Badge } from "react-bootstrap";

class CommentListFetch extends Component {
  state = {
    comments: [],
  };

  getComments = async (imdbID) => {
    const url = "https://striveschool-api.herokuapp.com/api/comments/";

    const response = await fetch(url + imdbID, {
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJmYWVmNzY1MjhmYzAwMTc3N2U3NzUiLCJpYXQiOjE2MDYzOTc2ODgsImV4cCI6MTYwNzYwNzI4OH0.__kaGV3TDkLWQaWBQR5cMKPxXCER9RWV9lqatwtZZF8",
      }),
    });

    let comments = await response.json();
    this.setState({ comments });
  };

  componentDidMount() {
    this.getComments(this.props.imdbID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imdbID !== this.props.imdbID) {
      this.getComments(this.props.imdbID);
    }
  }

  render() {
    return (
      <>
        {this.state.comments &&
          this.state.comments.length > 0 &&
          this.state.comments.map((comment) => (
            <ListGroup key={comment._id}>
              <ListGroup.Item>
                <Badge pill variant="info" className="mr-2">
                  {comment.rate}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          ))}
      </>
    );
  }
}
export default CommentListFetch;
