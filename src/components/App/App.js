import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preloader from "../Preloader";
import Main from "../Main";

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
