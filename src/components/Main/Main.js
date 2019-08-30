import React from "react";
import styles from "./Main.module.scss";
import Header from "../Header";
import About from "../About";

function Main() {
  return (
    <div className={styles.Wrapper}>
      <Header />
      <About />
    </div>
  );
}

export default Main;
