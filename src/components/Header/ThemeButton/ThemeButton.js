import React from "react";
import styles from "./ThemeButton.module.scss";
import { ContextConsumer } from "../../../common/context/Context";

function ThemeButton() {
  return (
    <ContextConsumer>
      {context => (
        <div className={styles.ThemeButton}>
          <input type="checkbox" id="themeButton" name="check" />
          <label htmlFor="themeButton" onClick={context.toggleTheme} />
        </div>
      )}
    </ContextConsumer>
  );
}

export default ThemeButton;
