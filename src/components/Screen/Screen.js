import React, { PureComponent } from "react";
import "./Screen.css";

class Screen extends PureComponent {
  state = {};

  render() {
    return (
      <pre className="Screen">
        Привет. Меня зовут Клименко Иван, и я начинающий фронтенд-разработчик.
      </pre>
    );
  }
}

export default Screen;
