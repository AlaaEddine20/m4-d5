import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-elastic-carousel";
import { Card, Row, Container, Spinner, Button } from "react-bootstrap";
import Movie from "./Movie";

class Gallery extends React.Component {
  render() {
    const { title, movies, loading } = this.props;

    return (
      <div>
        <h4>{title}</h4>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 no-gutters text-center">
          {loading ? (
            <Row>
              <Spinner animation="border" variant="light" />
            </Row>
          ) : (
            <>
              {movies.map((movie) => (
                <Movie
                  data={movie}
                  key={movie.imdbID}
                  openModal={this.props.handleOpenModal}
                />
              ))}
            </>
          )}
        </Row>
      </div>
    );
  }
}
export default Gallery;
