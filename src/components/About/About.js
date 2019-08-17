import React from "react";
import styles from "./About.module.scss";
import HeaderStub from "../Header/HeaderStub";

function About() {
  return (
    <div className={styles.About}>
      <HeaderStub />
      <div>About</div>
    </div>
  );
}

export default About;
