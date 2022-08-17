import React from "react";

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container">
                <h3 className="about-project__subtitle about-project__subtitle_grid">Дипломный проект включал 5 этапов</h3>
                <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__text about-project__text_grid">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>
                <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </p>
            </div>
            <div className="about-project__time">
                <p className='about-project__time about-project__time_black'>1 неделя</p>
                <p className='about-project__time about-project__time_grey'>4 недели</p>
            </div>
            <div className="about-project__caption">
                <p className='about-project__end'>Back-end</p>
                <p className='about-project__end'>Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;