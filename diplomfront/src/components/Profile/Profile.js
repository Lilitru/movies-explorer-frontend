import React from "react";
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <section className="profile">
            <h2 className="profile__title">Привет, Лилия!</h2>
            <div className="profile__form">
                <p className="profile__label">Имя</p>
                <p className="profile__input">Лилия</p>
            </div>    
            <div className='profile__span'></div>
            <div className="profile__form">
                <p className="profile__label">E-mail</p>
                <p className="profile__input">pochta@yandex.ru</p>
            </div>
            <button className='profile__btn'>Редактировать</button>
            <Link to='/signin' className='profile__link'>Выйти из аккаунта</Link>
        </section >
    );
}

export default Profile;