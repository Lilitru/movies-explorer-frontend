import React from 'react';
import film from '../../images/film.png'

function MoviesCard() {

    return (
        <li className='movies-card'>
            <button className='movies-card__btn'>Сохранить</button>
            <img className='movies-card__img' src={film} alt="Фильм"></img>
            <div className='movies-card__description'>
                <h3 className='movies-card__title'>Бег это свобода</h3>
                <p className='movies-card__time'>1ч17м</p>
            </div>
        </li>
    )
}

export default MoviesCard;
