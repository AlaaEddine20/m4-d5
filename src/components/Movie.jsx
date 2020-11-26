import React, { Component } from "react";
import { Col, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Movie extends Component {
  render() {
    return (
      <Col className="mb-4 d-flex flex-column justify-content-center">
        <Image
          className="img-fluid h-100"
          src={this.props.data.Poster}
          alt="movie pic"
          onClick={() =>
            this.props.history.push(`/Details/${this.props.data.imdbID}`)
          }
        />
        <Button
          className="mx-3 mt-3"
          onClick={() => this.props.showModal(this.props.data.imdbID)}
        >
          Open
        </Button>
      </Col>
    );
  }
}

export default withRouter(Movie);
