import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preloader from "../Preloader";
import Main from "../Main";
import {
  ThemeProvider,
  ThemeConsumer
} from "../../common/contexts/ThemeContext";

import "normalize.css";
import "../../common/styles/universal.scss";
import styles from "./App.module.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider>
          <ThemeConsumer>
            {context => (
              <div className={styles.App} data-theme={context.state.theme}>
                <Switch>
                  <Route exact path="/" component={Preloader} />
                  <Route path="/index" component={Main} />
                </Switch>
              </div>
            )}
          </ThemeConsumer>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
