import React from "react";
import { useHistory } from 'react-router-dom';

function Error() {

    
  const history = useHistory();

    return (
        <section className="error">
            <h2 className="error__title">404</h2>
            <h3 className="error__subtitle">Страница не найдена</h3>
            <button className="error__link" onClick={()=>{history.goBack()}}>Назад</button>   
        </section>
    );
}

export default Error;