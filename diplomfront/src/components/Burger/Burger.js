import React from "react";
import Navigation from "../Navigation/Navigation";

function Burger() {
    const [menuActive, setMenuActive] = React.useState(false)
    const items = [{ value: "Главная", href: '/' },
    { value: "Фильмы", href: '/movies' },
    { value: "Сохраненные фильмы", href: '/saved-movies' },
    { value: "Аккаунт", href: '/profile' },
    ]

    return (
        <>
            <nav className="nav">
                <div className="burger-btn" onClick={() => setMenuActive(!menuActive)}>
                    <span className="burger-btn__span" />
                </div>
            </nav>
            <Navigation active={menuActive} setActive={setMenuActive} header={"BurgerMenu"} items={items} />
        </>
    );
}

export default Burger;