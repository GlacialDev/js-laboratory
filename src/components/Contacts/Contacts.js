import React from "react";
import styles from "./Contacts.module.scss";
import HeaderStub from "../Header/HeaderStub";

function Contacts() {
  return (
    <div className={styles.Contacts}>
      <HeaderStub />
      <div>Contacts</div>
    </div>
  );
}

export default Contacts;
