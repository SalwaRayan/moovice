import React, { Component } from 'react';

import Card from '../components/Card'

class PopularBattle extends Component {
  constructor() {
    super()

    this.state = {
      movies: [],
    }
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=74ff4d5b18f55c304a239fadf716fe2f")
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          movies: data.results,
          currentBattle: 0,
        })
      })
  }
  
  render() {
    const { movies } = this.state

    // console.log(movies)

    return (
      <div className="container">
        <h1 className="my-5 text-center">Popular</h1>

        <div className="d-flex flex-wrap justify-content-center">
        <h2>Select a card to battle it with his neighbour</h2>
        {/* {movies.map((movie) => (
          <Card 
              title={movie.title}
              release={movie.release_date}
              description={movie.overview}
              image={movie.poster_path}
            />
        ))} */}
        </div>

      </div>
    );
  }
}

export default PopularBattle;