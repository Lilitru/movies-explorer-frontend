import React from 'react';

function MovieFilter(props) {

  return (
        <div className='movie-filter__filter'>
          <label className='movie-filter__check'>
            <input className='movie-filter__radio' type="checkbox" onChange={props.checkShort} checked={props.onChecked}></input>
           <span className="movie-filter__slider movie-filter__round"></span>
          </label>
          <p className='movie-filter__text'>Короткометражки</p>
        </div>
  )
}

export default MovieFilter;