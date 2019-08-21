import React from "react";
import styles from "./LocaleButton.module.scss";
import { ContextConsumer } from "../../../../common/context/Context";

function LocaleButton(props) {
  return (
    <ContextConsumer>
      {context => (
        <div className={`${styles.LocaleButton} ${props.className}`}>
          <input type="checkbox" id="localeButton" name="check" />
          <label htmlFor="localeButton" onClick={context.toggleLocale} />
        </div>
      )}
    </ContextConsumer>
  );
}

export default LocaleButton;
