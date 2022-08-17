import React from "react";
import portfolio__link from '../../images/portfolio__link.png';

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">Портфолио</h2>
                <h3 className="portfolio__subtitle">Статичный сайт</h3>
                <h3 className="portfolio__subtitle">Адаптивный сайт</h3>
                <h3 className="portfolio__subtitle">Одностраничное приложение</h3>
            </div>
            <div className="portfolio__link">
                <img className="portfolio__img" src={portfolio__link} alt="Стрелка" />
                <img className="portfolio__img" src={portfolio__link} alt="Стрелка" />
                <img className="portfolio__img" src={portfolio__link} alt="Стрелка" />
            </div>
        </section>
    );
}

export default Portfolio;