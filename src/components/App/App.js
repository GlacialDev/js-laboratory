import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preloader from "../Preloader";
import Main from "../Main";
import About from "../About";

import "normalize.css";
import "../../common/styles/universal.scss";
import styles from "./App.module.scss";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path="/" component={Preloader} />
          <Route path="/index" component={Main} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
