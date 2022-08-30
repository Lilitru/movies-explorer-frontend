import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../images/logoHeader.svg';
import { useFormWithValidation } from '../RegisterValidator/RegisterValidator';

function Register(props) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const registerBtn = (
        `register__btn register__btn${isValid === true ? '_active' : ''}`
    );

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onRegisterUser(values.userName, values.password, values.email);
    }

    return (
        <>
        {
            props.isLoggedIn ? <Redirect to="/movies" /> :

                <section className="register"  >
                    <div className="register__cont">
                        <Link to="/" className="register__logo"><img className="register__logo" src={logo} alt="Логотип" />
                        </Link>
                        <h2 className="register__title">Добро пожаловать!</h2>
                        <form name="registerUser" className="register__form" onReset={resetForm} onSubmit={handleSubmit}>
                            <input onChange={handleChange} name="userName" value={values.userName} className="register__input" placeholder="Имя" required minLength="2" maxLength="30" pattern="^[a-zA-ZА-Яа-яЁё\s-]+$" />
                            {errors.userName && <span id="name-error" className="register__error" >{errors.userName}</span>}
                            <input onChange={handleChange} value={values.email} className="register__input" name="email" type="text" placeholder="E-mail" required pattern='(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))' />
                            {errors.email && <span id="email-error" className="register__error" >{errors.email}</span>}
                            <input name="password" onChange={handleChange} value={values.password} type="password" className="register__input" placeholder="Пароль" required />
                            {errors.password && <span id="password-error" className="register__error" >{errors.password}</span>}
                            {props.registrationError && <span id="registration-error" className="register__error" >{props.registrationError}</span>}
                            <button type="submit" className={registerBtn}>Зарегистрироваться</button>
                        </form>
                        <div className="register__text">
                            <p>Уже зарегистрированы?</p>
                            <Link to="/signin" className="register__link"> Войти</Link>
                        </div>
                    </div>
                </section>
        }
        </>
    )
}

export default Register;