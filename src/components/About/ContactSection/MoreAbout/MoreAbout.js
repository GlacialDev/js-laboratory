import React from "react";
import styles from "./MoreAbout.module.scss";
import { FormattedMessage } from "react-intl";

function MoreAbout() {
  return (
    <div className={styles.about}>
      <div className={styles.about_container}>
        <FormattedMessage id="contacts.moreAbout"></FormattedMessage>
      </div>
    </div>
  );
}

export default MoreAbout;
