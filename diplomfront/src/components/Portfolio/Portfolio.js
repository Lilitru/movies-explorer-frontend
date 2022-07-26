import React from "react";
import portfolio__link from '../../images/portfolio__link.svg';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__container">
                <li>
                    <a className="portfolio__link" href="https://github.com/Lilitru/mesto-react" target="blank">Статичный сайт
                        <img className="portfolio__img" src={portfolio__link} alt="Стрелка" />
                    </a>
                </li>
                <li>
                    <a className="portfolio__link" href="https://github.com/Lilitru/mesto-react" target="blank">Адаптивный сайт
                        <img className="portfolio__img" src={portfolio__link} alt="Стрелка" />
                    </a>
                </li>
                <li>
                    <a className="portfolio__link" href="https://github.com/Lilitru/mesto-react" target="blank">Одностраничное приложение
                        <img className="portfolio__img" src={portfolio__link} alt="Стрелка" />
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;