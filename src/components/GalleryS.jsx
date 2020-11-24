import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { CardGroup, Card, Row, Col, Alert } from "react-bootstrap"

class Gallery extends React.Component {
  state = {
    movies: [],
    loading: true,
  };

	componentDidMount = (props) => {
		this.setState({ movies: this.props.movies })
	}
	render() {
		if (this.props.movies) {
			return (
				<Row>
					{this.state.movies.map((movie, index) => (
						<Col
							className="d-flex justify-content-center mt-2 mb-5"
							md={5}
							lg={4}
							key={index}
						>
							<Card>
								<Card.Img
									variant="top"
									style={{ width: 300, height: 400 }}
									src={movie.Poster}
								/>
								<Card.Body>
									<Card.Title>{movie.Title}</Card.Title>
									<Card.Text>{movie.Type}</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">{movie.Year}</small>
								</Card.Footer>
							</Card>
						</Col>
					))}
				</Row>
			)
		} else {
			return <Alert variant="danger">ERROR NO RESULTS FOUND</Alert>
		}
	}
}

export default Gallery;
