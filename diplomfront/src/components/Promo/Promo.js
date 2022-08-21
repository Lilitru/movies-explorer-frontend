import React from "react";
import { Link } from 'react-router-dom';
import promoImg from '../../images/text__promo.svg';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя</p>
                <Link to="/movies" className='promo__btn'>Узнать больше</Link>
            </div>
            <img className="promo__img" src={promoImg} alt="Земля веб" />
        </section>
    );
}

export default Promo;