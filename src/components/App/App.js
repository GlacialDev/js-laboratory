import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./App.css";
import Main from "../Main";
import About from "../About";
import MyWorks from "../MyWorks";
import Sidebar from "../Sidebar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/works" component={MyWorks} />
        </Switch>
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
