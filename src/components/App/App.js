import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../Main";
import About from "../About";
import MyWorks from "../MyWorks";

import "normalize.css";
import styles from "./App.module.scss";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/works" component={MyWorks} />
        </Switch>
        {/* <Sidebar /> */}
      </div>
    </Router>
  );
}

export default App;
