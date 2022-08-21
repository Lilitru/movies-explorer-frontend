import React from "react";
import photo from '../../images/aboutMe__photo.jpg';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__subtitle">Лилия</h3>
                    <h3 className="about-me__text">Фронтенд-разработчик, 32 года</h3>
                    <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <div className="about-me__links">
                        <a className='about-me__link' target="_blank" >Facebook</a>
                        <a className='about-me__link' target="_blank" >Github</a>
                    </div>
                </div>
                <img className="about-me__img" src={photo} alt="Фото" />
            </div>
        </section>
    );
}

export default AboutMe;