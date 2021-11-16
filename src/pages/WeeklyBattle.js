import React, { Component } from 'react';

import moment from 'moment'

import Card from '../components/Card'

class WeeklyBattle extends Component {
  constructor() {
    super()

    this.state = {
      movies: [],
      currentBattle: 0,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    this.setState({ currentBattle: this.state.currentBattle + 2})
    
    let favoriteArray = localStorage.getItem("favorite")

    if(!favoriteArray) {
      favoriteArray = localStorage.setItem("favorite", JSON.stringify([id]))
    } else {
      favoriteArray = JSON.parse(favoriteArray)
      favoriteArray = [...favoriteArray, id]
      favoriteArray = localStorage.setItem("favorite", JSON.stringify(favoriteArray))
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
    const { movies, currentBattle } = this.state

    console.log(currentBattle)
    return ( 
      <div className="container">
        <h1 className="my-5 text-center">Popular Battle</h1>
        {currentBattle === 20 ?
          <h2 className="my-5 text-center">You have seen all the films</h2>
          :
          <h2 className="my-5 text-center">Select a card to battle it with its neighbour</h2>
        }
        
        <div className="d-flex flex-wrap justify-content-center">
          {movies.map((movie, index) => {
            if(index === currentBattle || index === currentBattle + 1) {
              return <div onClick={() => this.handleClick(movie.id)}>
                <Card
                  title={movie.title}
                  release={movie.release_date}
                  description={movie.overview}
                  image={movie.poster_path}
                />
              </div>
            }
          })}
        </div>

      </div>
    );
  }
}

export default WeeklyBattle;