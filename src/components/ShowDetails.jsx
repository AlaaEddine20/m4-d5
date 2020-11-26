import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Image } from "react-bootstrap";

export default class ShowDetails extends React.Component {
  state = {
    data: null,
    title: null,
    poster: null,
    comments: [],
  };

  getComments = async (imdbID) => {
    const url = "https://striveschool-api.herokuapp.com/api/comments/";
    const response = await fetch(url + imdbID, {
      headears: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJmYWVmNzY1MjhmYzAwMTc3N2U3NzUiLCJpYXQiOjE2MDYzOTc2ODgsImV4cCI6MTYwNzYwNzI4OH0.__kaGV3TDkLWQaWBQR5cMKPxXCER9RWV9lqatwtZZF8",
      }),
    });

    const comments = await response.json();
    this.setState({ comments });
  };

  getData = async (imdbID) => {
    const url = "http://www.omdbapi.com/";
    const response = await fetch(url + "?apikey=ee4589ef&i=" + imdbID);
    const parsedResp = await response.json();

    this.setState({
      data: parsedResp,
      poster: parsedResp.Poster,
      title: parsedResp.Title,
    });
  };

  componentDidMount() {
    this.getComments(this.props.match.params.imdbID);
    this.getData(this.props.match.params.imdbID);
  }
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Image src={this.state.poster} />
            </Col>
            <Col>
              <h1>{this.state.title}</h1>
              <h6>{this.state.data}</h6>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
