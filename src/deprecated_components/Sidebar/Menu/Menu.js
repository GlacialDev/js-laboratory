import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <div className="Menu">
      <ul className="navList">
        <li className="navItem">
          <Link className="navLink" to="/">
            Главная
          </Link>
        </li>
        <li className="navItem">
          <Link className="navLink" to="/works">
            Мои работы
          </Link>
        </li>
        <li className="navItem">
          <Link className="navLink" to="/about">
            Обо мне
          </Link>
        </li>
        {/* <li className="navItem">
          <Link className="navLink" to="/contacts">
            Контакты
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Menu;
