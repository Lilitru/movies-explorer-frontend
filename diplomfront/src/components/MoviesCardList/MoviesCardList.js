import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {


  function checkIfMovieIsSaved(card){
    return props.savedMovies ? props.savedMovies.some((item)=> item.movieId === card.id) : false;
  }


  return (
    <section className='movies-card-list'>
      <ul id="moviesList" className="movies-card-list__lists">
        {props.movies ? props.movies.map((c) => (<MoviesCard key={c.id || c.movieId} card={c} isSaved={checkIfMovieIsSaved(c)} saveMovie={props.saveMovie}/>)) :''}
      </ul>
    </section>
  )
}

export default MoviesCardList;