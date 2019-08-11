import React from "react";
import styles from "./Main.module.scss";
import Header from "../Header";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import About from "../About";

function Main() {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <Header />
        {/* <Route path="/about" component={About} /> */}
      </div>
    </div>
  );
}

export default Main;
