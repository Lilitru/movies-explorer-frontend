import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logoHeader.png'

function Register(props) {

    return (
        <section className="register"  >
            <div className="register__cont">
                <Link to="/"><img className="register__logo" src={logo} alt="Логотип" />
                </Link>
                <h2 className="register__title">Добро пожаловать!</h2>
                <form name="" className="register__form">
                    <input className="register__input" placeholder="Имя" />
                    <input className="register__input" placeholder="E-mail" />
                    <input className="register__input" placeholder="Пароль" />
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