import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-elastic-carousel";
import { Card, Row, Container, Spinner, Button } from "react-bootstrap";

class Gallery2 extends React.Component {
  state = {
    movies: [],
    search: "fast furious",
    type: "movie",
    loading: true,
  };

  componentDidMount = async () => {
    try {
      let response = await fetch(
        "http://www.omdbapi.com/?&s=" +
          this.state.search +
          "&apikey=ee4589ef&type=" +
          this.state.type
      );
      let movies = await response.json();
      this.setState({ movies: movies.Search, loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Container fluid>
        {this.state.loading && (
          <div className="font-bold d-flex justify-content-center">
            <span>Feching Movies</span>
            <Spinner animation="border" variant="success" />
          </div>
        )}
        <h1 style={{ marginLeft: 85 }}>{this.state.search}</h1>
        <Carousel itemsToShow={5}>
          {this.state.movies.map((movie, key) => (
            <Row>
              <Card className="mt-2 mb-5" md={4} lg={3} key={key}>
                <Card.Img
                  variant="top"
                  style={{ objectFit: "cover", width: 300, height: 400 }}
                  src={movie.Poster}
                  className="mx-auto"
                />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Type}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{movie.Year}</small>
                </Card.Footer>
                <Button className="mx-auto" variant="info">
                  Info
                </Button>
              </Card>
            </Row>
          ))}
        </Carousel>
      </Container>
    );
  }
}

export default Gallery2;
