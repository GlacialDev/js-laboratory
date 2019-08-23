import React from "react";
import styles from "./WelcomeSection.module.scss";
import HeaderStub from "../../Header/HeaderStub";
import { FormattedMessage } from "react-intl";

function WelcomeSection({ scrollControl }) {
  return (
    <section className={styles.welcome}>
      <HeaderStub />
      <div className={styles.welcome_question}>
        <FormattedMessage id="welcome.question" />
      </div>
      <button
        className={styles.welcome_button}
        onClick={e => scrollControl(e)}
        data-scroll_next
      >
        <FormattedMessage id="welcome.button" />
      </button>
    </section>
  );
}

export default WelcomeSection;
