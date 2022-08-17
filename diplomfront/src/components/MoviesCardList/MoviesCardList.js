import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

  return (
    <section className='movies-card-list'>
      <ul className="movies-card-list__lists">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className='movies-card-list__btn'>Ещё</button>
    </section>
  )
}

export default MoviesCardList;



