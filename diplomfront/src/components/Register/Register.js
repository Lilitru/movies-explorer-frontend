import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logoHeader.svg'

function Register(props) {

    return (
        <section className="register"  >
            <div className="register__cont">
                <Link to="/" className="register__logo"><img className="register__logo" src={logo} alt="Логотип" />
                </Link>
                <h2 className="register__title">Добро пожаловать!</h2>
                <form name="" className="register__form">
                    <input className="register__input" placeholder="Имя" required />
                    <input className="register__input" placeholder="E-mail" required />
                    <input className="register__input" placeholder="Пароль" required />
                    <button type="submit" className="register__btn">Зарегистрироваться</button>
                </form>
                <div className="register__text">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__link"> Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;