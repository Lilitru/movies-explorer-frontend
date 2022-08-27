import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../images/logoHeader.svg'
import { useFormWithValidation } from '../RegisterValidator/RegisterValidator';


function Login(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const loginBtn = (
        `login__btn login__btn${isValid === true ? '_active' : ''}`
    );

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onLoginUser(values.email, values.password);
    }

    return (
        <>
            {
                props.isLoggedIn ? <Redirect to="/movies" /> :

                    <section className="login"  >
                        <div className="login__cont">
                            <Link to="/" className="login__logo"><img className="login__logo" src={logo} alt="Логотип" />
                            </Link>
                            <h2 className="login__title">Рады видеть!</h2>
                            <form name="loginUser" className="login__form" onReset={resetForm} onSubmit={handleSubmit}>
                                <input onChange={handleChange} name="email" type="text" value={values.email} className="login__input" placeholder="E-mail" required pattern='([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})' />
                                {errors.email && <span id="email-error" className="register__error" >{errors.email}</span>}
                                <input name="password" onChange={handleChange} value={values.password} type="password" className="login__input" placeholder="Пароль" required />
                                {errors.password && <span id="password-error" className="register__error" >{errors.password}</span>}
                                <button type="submit" className={loginBtn}>Войти</button>
                            </form>
                            <div className="login__text">
                                <p>Ещё не зарегистрированы?</p>
                                <Link to="/signup" className="login__link"> Регистрация</Link>
                            </div>
                        </div>
                    </section>
            }
        </>
    )
}

export default Login;