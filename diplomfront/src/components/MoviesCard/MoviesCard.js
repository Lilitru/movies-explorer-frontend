import React from 'react';
import { useLocation } from 'react-router-dom';
import moviesApi from '../../utils/MoviesApi';


function MoviesCard(props) {

    const location = useLocation();

    const saveButtonClassName = (
        `movies-card__btn${props.isSaved ? '_active' : ''}`
    );

    const moviesCardSpanClassName = (
        `movies-card__span${props.isSaved ? '_active' : ''}`
    );

    function timeToHours(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + "ч " + minutes + "м";
      }

    return (
        <li id="moviesCard" className='movies-card'>
            {location.pathname === '/movies' ?
                <>
                    <button type="button" className={saveButtonClassName} onClick={() => { props.saveMovie(props.card, props.isSaved) }}>Сохранить</button>
                    <span className={moviesCardSpanClassName} onClick={() => { props.saveMovie(props.card, props.isSaved) }}></span>
                    <span className='movies-card__delete'></span>
                </>
                :
                <>
                    <button type="button" className="movies-card__btn movies-card__btn_active">Сохранить</button>
                    <span className="movies-card__span"></span>
                    <span className='movies-card__delete movies-card__delete_active' onClick={() => { props.saveMovie(props.card) }}></span>
                </>
            }
            {/* <button type="button" className='movies-card__btn'>Сохранить</button> */}
            <a className='movies-card__link' href={props.card.trailerLink} target="_blank" rel='noreferrer'>
                <img className='movies-card__img' src={location.pathname === '/movies' ? `${moviesApi.getImagesBaseUrl()}${props.card.image.url}` : props.card.image} alt="Фильм"></img>
            </a>
            <div className='movies-card__description'>
                <h3 className='movies-card__title'>{props.card.nameRU}</h3>
                <p className='movies-card__time'>{timeToHours(props.card.duration)}</p>
            </div>
        </li>
    )
}

export default MoviesCard;
