import React from "react";
import styles from "./ContactSection.module.scss";
import HeaderStub from "../../Header/HeaderStub";
import { FormattedMessage } from "react-intl";
import ContactList from "./ContactList";
import MoreAbout from "./MoreAbout";

function ContactSection() {
  return (
    <section className={styles.contacts}>
      <HeaderStub />
      <div className={styles.contacts_header}>
        <FormattedMessage id="contacts.header" />
      </div>
      <div className={styles.contacts_content}>
        <ContactList />
        <MoreAbout />
      </div>
    </section>
  );
}

export default ContactSection;
