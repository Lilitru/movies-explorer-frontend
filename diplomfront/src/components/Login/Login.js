import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logoHeader.svg'

function Login(props) {

    return (
        <section className="login"  >
            <div className="login__cont">
                <Link to="/" className="login__logo"><img className="login__logo" src={logo} alt="Логотип" />
                </Link>
                <h2 className="login__title">Рады видеть!</h2>
                <form name="" className="login__form">
                    <input className="login__input" placeholder="E-mail" required />
                    <input className="login__input" placeholder="Пароль" required />
                    <button type="submit" className="login__btn">Войти</button>
                </form>
                <div className="login__text">
                    <p>Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="login__link"> Регистрация</Link>
                </div>
            </div>
        </section>
    )
}

export default Login;