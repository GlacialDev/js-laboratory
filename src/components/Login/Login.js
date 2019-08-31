import React from "react";
import styles from "./Login.module.scss";
import HeaderStub from "../Header/HeaderStub";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import SignInTab from "./SignInTab";
import SignUpTab from "./SignUpTab";

function Login({ match }) {
  return (
    <div className={styles.container}>
      <HeaderStub />
      <div className={styles.login}>
        <div className={styles.login_window}>
          <nav className={styles.login_navbar}>
            <ul className={styles.login_navbar_list}>
              <li className={styles.login_navbar_item}>
                <NavLink
                  exact
                  to={`${match.url}`}
                  className={styles.login_navbar_link}
                  activeClassName={styles.login_navbar_link_active}
                >
                  <FormattedMessage id="login.login" />
                </NavLink>
              </li>
              <li className={styles.login_navbar_item}>
                <NavLink
                  to={`${match.url}/signup`}
                  className={styles.login_navbar_link}
                  activeClassName={styles.login_navbar_link_active}
                >
                  <FormattedMessage id="login.registration" />
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.login_tabs}>
            <Switch>
              <Route exact path={`${match.url}`} component={SignInTab} />
              <Route path={`${match.url}/signup`} component={SignUpTab} />
              <Route component={() => <Redirect to="/error" />} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
