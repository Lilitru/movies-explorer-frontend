import React from 'react';
import logo from '../../images/logoHeader.svg';
import icon from '../../images/header__account.svg'
import { Link, useLocation } from 'react-router-dom';

function Header(props) {

  const location = useLocation();

  const visibleRoutes = ['/', '/movies', '/saved-movies', '/profile'];
  const filmsRoutes = ['/', '/movies', '/saved-movies', '/profile'];

  const captureMoviesLink = (
    `header__link header__link${location.pathname === '/movies' ? '_active' : ''}`
  );
  const captureSavedMoviesLink = (
    `header__link header__link${location.pathname === '/saved-movies' ? '_active' : ''}`
  );
  return (
    <>
      {visibleRoutes.includes(location.pathname)?
        <header className="header">
          <Link to="/"><img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          {location.pathname === '/' && ! props.isLoggedIn ?
            <>
              <div className='header__sign'>
                <Link to="/signup" className='header__reg'>Регистрация</Link>
                <Link to="/signin" className='header__btn'>Войти</Link>
              </div>
            </>
            : ''}

          {filmsRoutes.includes(location.pathname) && props.isLoggedIn ?
            <>
              <div className='header__links'>
                <Link to="/movies" className={captureMoviesLink}>Фильмы</Link>
                <Link to="/saved-movies" className={captureSavedMoviesLink}>Сохраненные фильмы</Link>
              </div>
              <Link to="/profile" className='header__profile'>
                <h3 className='header__text'>Аккаунт</h3>
                <img className='header__icon' src={icon}></img>
              </Link>
            </>
            : ''}
        </header>
        : ''
      }
    </>
  )
}

export default Header;