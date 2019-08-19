import React from "react";
import styles from "./LocaleButton.module.scss";
import { ContextConsumer } from "../../../common/context/Context";

function LocaleButton() {
  return (
    <ContextConsumer>
      {context => (
        <div className={styles.LocaleButton}>
          <input type="checkbox" id="localeButton" name="check" />
          <label htmlFor="localeButton" onClick={context.toggleLocale} />
        </div>
      )}
    </ContextConsumer>
  );
}

export default LocaleButton;
