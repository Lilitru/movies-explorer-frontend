import React from 'react';

import { Link, useLocation } from 'react-router-dom';

function Footer() {


  const location = useLocation();

  const visibleRoutes = ['/', '/movies', '/saved-movies'];

  return (
    <>
      {visibleRoutes.includes(location.pathname) ?
        <footer className="footer">
          <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
          <div className='footer__nav'>
            <p className='footer__caption'>© 2022</p>
            <ul className='footer__container'>
              <li className='footer__list'>Яндекс.Практикум</li>
              <li className='footer__list'>Github</li>
              <li className='footer__list'>Facebook</li>
            </ul>
          </div>
        </footer>
        : ''
      }
    </>
  )
}

export default Footer;