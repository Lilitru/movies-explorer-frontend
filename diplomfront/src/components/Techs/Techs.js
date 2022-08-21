import React from "react";

function Techs() {
    return (
        <section className="techs">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__container">
                <h3 className="techs__subtitle">7 технологий</h3>
                <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
            <div className="techs__cont">
                <p className='techs__techn'>HTML</p>
                <p className='techs__techn'>CSS</p>
                <p className='techs__techn'>JS</p>
                <p className='techs__techn'>React</p>
                <p className='techs__techn'>Git</p>
                <p className='techs__techn'>Express.js</p>
                <p className='techs__techn'>mongoDB</p>
            </div>
            </div>
        </section>
    );
}

export default Techs;