import React from "react";
import icon from '../../images/header__account.svg'
import { Link } from 'react-router-dom';

function Navigation({ items, active, setActive }) {

    return (
        <div className={active ? "navigation__active" : "navigation"} onClick={() => setActive(false)}>
            <div className="navigation__content" onClick={e => e.stopPropagation()}>
                <ul className="navigation__lists">
                    {items.map(item =>
                        <li className="navigation__list">
                            <a className="navigation__link" href={item.href}>{item.value}</a>
                        </li>
                    )}
                </ul>
                <Link to="/profile" className='navigation__profile'>
                    <h3 className='navigation__text'>Аккаунт</h3>
                    <img className='navigation__icon' src={icon}></img>
                </Link>
            </div>
        </div>
    );
}

export default Navigation;