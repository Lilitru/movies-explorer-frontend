import React from 'react';
import logo from '../../images/logoHeader.png';
import icon from '../../images/header__account.svg'
import { Link, useLocation } from 'react-router-dom';

function Header({ isLoggedIn }) {

  const location = useLocation();

  const visibleRoutes = ['/','/movies', '/saved-movies', '/profile']; 
  const filmsRoutes = ['/movies', '/saved-movies', '/profile'];

  return (
    <>
      {visibleRoutes.includes(location.pathname) ? 
          <header className="header">
            <Link to="/"><img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            {location.pathname === '/' ?
              <>
              <div className='header__sign'>
                <Link to="/signup" className='header__reg'>Регистрация</Link>
                <Link to="/signin" className='header__btn'>Войти</Link>
              </div>
              </>
              : ''}

            {filmsRoutes.includes(location.pathname) ?
              <>
                <div className='header__links'>
                  <Link to="/movies" className='header__link'>Фильмы</Link>
                  <Link to="/saved-movies" className='header__link'>Сохраненные фильмы</Link>
                </div>
                <Link to="/profile" className='header__profile'>
                  <h3 className='header__text'>Аккаунт</h3>
                  <img className='header__icon' src={icon}></img>
                </Link>
              </>
              : ''}
          </header>
          :''
      }
    </>
  )
}

export default Header;