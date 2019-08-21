import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import styles from "./Header.module.scss";

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
              <FormattedMessage id="header.main" />
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={`${match.url}/works`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              <FormattedMessage id="header.works" />
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={`${match.url}/contacts`}
              className={styles.navLink}
              activeClassName={styles.navLink_active}
            >
              <FormattedMessage id="header.contacts" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Header);
