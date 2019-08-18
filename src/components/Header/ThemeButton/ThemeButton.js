import React from "react";
import styles from "./ThemeButton.module.scss";
import { ThemeConsumer } from "../../../common/contexts/ThemeContext";

function ThemeButton() {
  return (
    <ThemeConsumer>
      {context => (
        <div className={styles.ThemeButton}>
          <input type="checkbox" id="themeButton" name="check" />
          <label htmlFor="themeButton" onClick={context.toggleTheme} />
        </div>
      )}
    </ThemeConsumer>
  );
}

export default ThemeButton;
