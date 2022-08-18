import React from "react";

function Navigation({ items, active, setActive }) {

    return (
        <div className={active ? "navigation__active" : "navigation"} onClick={() => setActive(false)}>
            {/* <div className="navigation__blur" /> */}
            <div className="navigation__content" onClick={e => e.stopPropagation()}>
              <ul className="navigation__lists">
                {items.map(item =>
                    <li className="navigation__list">
                        <a className="navigation__link" href={item.href}>{item.value}</a>
                    </li>
                )}
               </ul>
            </div>
        </div>
    );
}

export default Navigation;