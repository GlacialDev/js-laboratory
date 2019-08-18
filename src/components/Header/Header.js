import React from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import ThemeButton from "./ThemeButton";

function Header({ match }) {
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              exact
              to={`${match.url}`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              Главная
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={`${match.url}/works`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              Мои Работы
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={`${match.url}/contacts`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              Контакты
            </NavLink>
          </li>
        </ul>
      </nav>
      <ThemeButton />
    </div>
  );
}

export default withRouter(Header);
