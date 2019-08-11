import React from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "#4e8839",
  borderBottom: "2px solid #4e8839"
};

function Header() {
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/index"
              className={styles.navLink}
              activeStyle={activeStyle}
            >
              Главная
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/my-works"
              className={styles.navLink}
              activeStyle={activeStyle}
            >
              Мои Работы
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/contacts"
              className={styles.navLink}
              activeStyle={activeStyle}
            >
              Контакты
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
