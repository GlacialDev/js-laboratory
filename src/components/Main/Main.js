import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./Main.module.scss";
import Header from "../Header";

import About from "../About";

function Main({ match }) {
  return (
    <div className={styles.Wrapper}>
      <Header />
      <Switch>
        <Route exact path={`${match.url}`} component={About} />
        {/* <Route path={`${match.url}/library`} component={} /> */}
        {/* <Route path={`${match.url}/blog`} component={} /> */}
      </Switch>
    </div>
  );
}

export default Main;
