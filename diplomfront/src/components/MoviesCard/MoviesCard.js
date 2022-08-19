import React from 'react';
import film from '../../images/film.png'
import { useLocation } from 'react-router-dom';

function MoviesCard() {
    const location = useLocation();
    const [movieSaved, setmovieSaved] = React.useState(false);

    const saveButtonClassName = (
        `movies-card__btn${movieSaved ? '_active' : ''}`
    );

    const moviesCardSpanClassName = (
        `movies-card__span${movieSaved ? '_active' : ''}`
    );

    return (
        <li className='movies-card'>
            {location.pathname === '/movies' ?
                <>
                    <button type="button" className={saveButtonClassName} onClick={() => setmovieSaved(!movieSaved)}>Сохранить</button>
                    <span className={moviesCardSpanClassName}></span>
                    <span className='movies-card__delete'></span>
                </>
                :
                <>
                    <button type="button" className="movies-card__btn movies-card__btn_active">Сохранить</button>
                    <span className="movies-card__span"></span>
                    <span className='movies-card__delete movies-card__delete_active'></span>
                </>
            }
            {/* <button type="button" className='movies-card__btn'>Сохранить</button> */}
            <img className='movies-card__img' src={film} alt="Фильм"></img>
            <div className='movies-card__description'>
                <h3 className='movies-card__title'>Бег это свобода</h3>
                <p className='movies-card__time'>1ч17м</p>
            </div>
        </li>
    )
}

export default MoviesCard;
