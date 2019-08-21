import React from "react";
import styles from "./ThemeButton.module.scss";
import { ContextConsumer } from "../../../../common/context/Context";

function ThemeButton(props) {
  return (
    <ContextConsumer>
      {context => (
        <div className={`${styles.ThemeButton} ${props.className}`}>
          <input type="checkbox" id="themeButton" name="check" />
          <label htmlFor="themeButton" onClick={context.toggleTheme} />
        </div>
      )}
    </ContextConsumer>
  );
}

export default ThemeButton;
