import React from "react";
import Navigation from "../Navigation/Navigation";

function Burger() {
    const [menuActive, setMenuActive] = React.useState(false);
    const items = [{ value: "Главная", href: '/' },
    { value: "Фильмы", href: '/movies' },
    { value: "Сохраненные фильмы", href: '/saved-movies' },
    ]

    const burgerButtonClassName = (
        `burger-btn${menuActive ? '__active' : ''}`
    );
    const spanButtonClassName = (
        `burger-btn__span${menuActive ? '_active' : ''}`
    );

    return (
        <>
            <nav className="burger">
                <div className={burgerButtonClassName} onClick={() => setMenuActive(!menuActive)}>
                    <span className={spanButtonClassName} />
                </div>
            </nav>
            <Navigation active={menuActive} setActive={setMenuActive} header={"BurgerMenu"} items={items} />
        </>
    );
}

export default Burger;