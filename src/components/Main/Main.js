import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./Main.module.scss";
import Header from "../Header";

import About from "../About";
import Works from "../Works";
import Contacts from "../Contacts";

function Main({ match }) {
  return (
    <div className={styles.Wrapper}>
      <Header />
      <Switch>
        <Route exact path={`${match.url}`} component={About} />
        <Route path={`${match.url}/works`} component={Works} />
        <Route path={`${match.url}/contacts`} component={Contacts} />
      </Switch>
    </div>
  );
}

export default Main;
