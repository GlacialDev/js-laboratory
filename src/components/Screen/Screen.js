import React, { PureComponent } from "react";
import styleText from "./styleText.js";
import "./Screen.css";

class Screen extends PureComponent {
  state = {};

  render() {
    return (
      <div className="Screen">
        {/* Привет. Меня зовут Клименко Иван, и я начинающий фронтенд-разработчик. */}
        <div dangerouslySetInnerHTML={createMarkup()} />
        <style>{styleText}</style>
      </div>
    );
  }
}

function createMarkup() {
  return { __html: styleText };
}

export default Screen;
