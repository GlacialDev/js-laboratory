import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./App.css";
import Main from "../Main";
import Menu from "../Menu";
import About from "../About";
import Contacts from "../Contacts";
import MyWorks from "../MyWorks";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/works" component={MyWorks} />
          <Route path="/contacts" component={Contacts} />
        </Switch>
        <Menu />
      </div>
    </Router>
  );
}

export default App;
