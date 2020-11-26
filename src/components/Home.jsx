import React from "react";
import Gallery from "./Gallery";
import { Alert, Button } from "react-bootstrap";
import MovieModal from "./MovieModal";
import CommentListFetch from "./CommentListFetch";

class Home extends React.Component {
  state = {
    harryPotter: [],
    spiderMan: [],
    batman: [],
    comments: [],
    showModal: false,
    selectedMovieID: null,
    loading: true,
    error: false,
  };

  url = "http://www.omdbapi.com/?apikey=ee4589ef";

  handleSelectedMovie = (imdbID) => {
    this.setState({ selectedMovieID: imdbID });
  };

  getMovies = () => {
    Promise.all([
      fetch(this.url + "&s=harry%20potter")
        .then((response) => response.json())
        .then((parsedResp) => {
          this.setState({ harryPotter: parsedResp.Search });
        }),
      fetch(this.url + "&s=spider%20man")
        .then((response) => response.json())
        .then((parsedResp) => {
          this.setState({ spiderMan: parsedResp.Search });
        }),
      fetch(this.url + "&s=batman")
        .then((response) => response.json())
        .then((parsedResp) => {
          this.setState({ batman: parsedResp.Search });
        }),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("Something went wrong");
      });
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

  handleOpenModal = (imdbID) => {
    this.setState({ showModal: true, selectedMovieID: imdbID });
    this.getComments(imdbID);
  };

  handleCloseModal = (imdbID) => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    this.getMovies();
  }
  render() {
    return (
      <div>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2 className="mb-4">TV Shows</h2>
              <div className="dropdown ml-4 mt-1">
                <button
                  className="btn btn-secondary btn-sm dropdown-toggle rounded-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ backgroundColor: "#221f1f" }}
                >
                  Genres &nbsp;
                </button>
                <div
                  className="dropdown-menu bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item text-white bg-dark" href="#">
                    Comedy
                  </a>
                  <a className="dropdown-item text-white bg-dark" href="#">
                    Drama
                  </a>
                  <a className="dropdown-item text-white bg-dark" href="#">
                    Thriller
                  </a>
                </div>
              </div>
            </div>
            <div className="d-none d-md-block">
              <i className="fa fa-th-large icons mr-2"></i>
              <i className="fa fa-th icons"></i>
            </div>
          </div>

          {this.state.selectedMovieID && (
            <>
              <CommentListFetch imdbID={this.state.selectedMovieID} />
              <Button onClick={() => this.setState({ selectedMovieID: null })}>
                Reset comments
              </Button>
            </>
          )}

          {this.state.error && (
            <Alert variant="danger" className="text-center">
              An error has occurred, please try again later
            </Alert>
          )}

          {!this.state.error &&
            (this.props.searchedMovies.length > 0 ||
              this.props.searchedLoading === true) && (
              <Gallery
                title="Search Results"
                loading={this.props.searchedLoading}
                movies={this.props.searchedMovies}
                comments={this.state.comments}
                fetchComments={this.fetchComments}
                handleOpenModal={this.handleOpenModal}
              />
            )}

          {!this.state.error &&
            (!this.props.searchedMovies.length > 0 ||
              this.props.searchedLoading === null) && (
              <>
                <Gallery
                  title="Spider Man"
                  loading={this.state.loading}
                  movies={this.state.harryPotter.slice(0, 6)}
                  comments={this.state.comments}
                  fetchComments={this.fetchComments}
                  handleOpenModal={this.handleOpenModal}
                  // selectedMovieID={this.handleSelectedMovie}
                />
                <Gallery
                  title="Star Wars"
                  loading={this.state.loading}
                  movies={this.state.spiderMan.slice(0, 6)}
                  comments={this.state.comments}
                  fetchComments={this.fetchComments}
                  handleOpenModal={this.handleOpenModal}
                  // selectedMovieID={this.handleSelectedMovie}
                />
                <Gallery
                  title="Harry Potter"
                  loading={this.state.loading}
                  movies={this.state.batman.slice(0, 6)}
                  comments={this.state.comments}
                  fetchComments={this.getComments}
                  handleOpenModal={this.handleOpenModal}
                  // selectedMovieID={this.handleSelectedMovie}
                />
              </>
            )}
          <MovieModal
            isOpen={this.state.showModal}
            selectedMovieID={this.state.selectedMovieID}
            comments={this.state.comments}
            close={this.handleCloseModal}
            fetchComments={this.fetchComments}
          />
        </div>
      </div>
    );
  }
}

export default Home;
