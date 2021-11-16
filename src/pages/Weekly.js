import React, { Component } from 'react';

import moment from 'moment'

import Card from '../components/Card'

class Weekly extends Component {
  constructor() {
    super()

    this.state = {
      movies: [],
    }
  }

  componentDidMount() {
    let today = moment().format("YYYY-MM-DD")
    let lastWeek = moment().subtract(7, 'd').format("YYYY-MM-DD")

    fetch(`http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${lastWeek}&primary_release_date.lte=${today}&api_key=9958597c07ec90e02675c97691bf4506`)
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          movies: data.results
        })
      })
  }
  
  render() {
    const { movies } = this.state

    console.log(moment().format("YYYY-MM-DD"))
    console.log(moment().subtract(7, 'd').format("YYYY-MM-DD"))

    return (
      <div className="container">
        <h1 className="my-5 text-center">Weekly Films</h1>

        <div className="d-flex flex-wrap justify-content-center">
        {movies.map(movie => (
          <Card 
              title={movie.title}
              release={movie.release_date}
              description={movie.overview}
              image={movie.poster_path}
            />
        ))}
        </div>

      </div>
    );
  }
}

export default Weekly;