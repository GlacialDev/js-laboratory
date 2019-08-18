import React from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { ThemeConsumer } from "../../common/contexts/ThemeContext";

const activeStyle = {
  color: "#4e8839"
};

function Header({ match }) {
  return (
    <ThemeConsumer>
      {context => (
        <div className={styles.header}>
          <nav className={styles.nav}>
            {console.log(context)}
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink
                  exact
                  to={`${match.url}`}
                  className={styles.navLink}
                  activeStyle={activeStyle}
                >
                  Главная
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to={`${match.url}/works`}
                  className={styles.navLink}
                  activeStyle={activeStyle}
                >
                  Мои Работы
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to={`${match.url}/contacts`}
                  className={styles.navLink}
                  activeStyle={activeStyle}
                >
                  Контакты
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </ThemeConsumer>
  );
}

export default withRouter(Header);
