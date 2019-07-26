import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../Main";
import About from "../About";
import MyWorks from "../MyWorks";
import Sidebar from "../Sidebar";

import "normalize.css";
import "./App.css";
import appStyle from "../../common/appStyle";
// Мы передаем appStyle в пропсы компонентов, чтобы компонент Main отрабатывал корректно

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={() => About({ appStyle })} />
          <Route path="/works" component={() => MyWorks({ appStyle })} />
        </Switch>
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
