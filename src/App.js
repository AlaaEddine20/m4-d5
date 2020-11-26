import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router , Route } from 'react-router-dom'
import './App.css';
import './style.css';
import MovieDetails from "./components/MovieDetails"
import MyNavBar from "./components/MyNavBar"

import Home from "./components/Home"
class App extends React.Component {

  state = {
    searchedMovies: [],
    searchLoading: []
  }

  showResults = (searchString) => {
    this.setState({ searchLoading: true })

    fetch(`http://www.omdbapi.com/?apikey=ee4589ef&s=${searchString}`)
    .then((response) => response.json())
    .then((parsedResp) => {
      if(parsedResp.Response === "true") {

        this.setState({ searchedMovies: parsedResp.Search })
        this.setState({ searchLoading: false })
      } 
        this.setState({ searchLoading: false })
    })
    .catch((error) => {
      this.setState({ searchLoading: null })
    })
    
  }
  render () {
    
    return (
      <>
     <Router >
      <MyNavBar/>
      <Route path={'/'} exact render={(props) => <Home searchedMovies={this.state.searchedMovies}
      searchLoading={this.state.searchLoading} {...props} />}/>
      <Route path="/Details" component={MovieDetails} />
      <Route path="/Details/:imdbID" component={MovieDetails} />
    </Router >

  


       </>
    )
  }
}

export default App;
