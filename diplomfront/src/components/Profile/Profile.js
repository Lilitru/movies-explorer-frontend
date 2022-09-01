import React from "react";
import Burger from "../Burger/Burger";
import { useFormWithValidation } from '../RegisterValidator/RegisterValidator';
import { UserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

    const currentUser = React.useContext(UserContext);

    const { values, handleChange, errors, isValid, resetForm, setValues } = useFormWithValidation();

    const [dataIsNotEqual, setDataIsNotEqual] = React.useState(true);

    React.useEffect(() => {
        if (!values.name)
            setValues({ ...values, 'name': currentUser.name });
        if (!values.email)
            setValues({ ...values, 'email': currentUser.email });

        if (values.email && values.email === currentUser.email && values.name && values.name === currentUser.name)
            setDataIsNotEqual(false);
        else
            setDataIsNotEqual(true);

    }, [currentUser, values]);

    const profileBtn = (
        `profile__btn profile__btn${(isValid && dataIsNotEqual) ? '_active' : ''}`
    );

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.updateUserInfo(values.name, values.email);
    }

    return (
        <>
            <Burger />
            <section className="profile">
                <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
                <form name="profileUser" className="profile__form" onReset={resetForm} onSubmit={handleSubmit}>
                    <input onChange={handleChange} name="name" type="text" value={values.name} className="profile__input" placeholder="Имя" required minLength="2" maxLength="30" pattern='^[a-zA-ZА-Яа-яЁё\s-]+$' />
                    {errors.name && <span id="namme-error" className="register__error" >{errors.name}</span>}
                    <div className="profile__span"></div>
                    <input onChange={handleChange} name="email" type="text" value={values.email} className="profile__input" placeholder="E-mail" required pattern='([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})' />
                    {errors.email && <span id="email-error" className="register__error" >{errors.email}</span>}
                    <button type="submit" className={profileBtn}>Редактировать</button>
                </form>
                <button className='profile__link' onClick={props.onSignOut}>Выйти из аккаунта</button>
            </section >
        </>
    );
}

export default Profile;