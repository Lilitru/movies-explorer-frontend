import React from 'react';
import Done from '../../images/Done.png';
import Fail from '../../images/Fail.png';

function InfoTooltip(props) {

  return (
    <div className={`popup popup_image${props.isOpen ? " popup_opened" : ""}`}>
      <div className="popup__cont">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <div className='tooltip'>
          <img src={props.ok ? Done : Fail} className="tooltip__img"></img>
          <p className="tooltip__title">{props.ok ? `Готово!` : `Что-то пошло не так!Попробуйте еще раз.`}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;