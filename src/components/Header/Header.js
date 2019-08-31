import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              exact
              to={`/`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              <FormattedMessage id="header.main" />
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={`/library`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              <FormattedMessage id="header.library" />
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={`/blog`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              <FormattedMessage id="header.blog" />
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={`/login`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              <FormattedMessage id="header.login" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Header);
