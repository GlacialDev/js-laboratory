import React from "react";
import styles from "./Main.module.scss";
import Header from "../../Header";
import About from "../../About";
import Login from "../../Login";
import Logout from "../../Logout";
import ErrorPage from "../../ErrorPage";
import { Route, Switch } from "react-router-dom";

function Main() {
  return (
    <div className={styles.Wrapper}>
      <Header />
      <Switch>
        <Route exact path="/" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default Main;
