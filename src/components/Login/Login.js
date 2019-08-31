import React from "react";
import styles from "./Login.module.scss";
import HeaderStub from "../Header/HeaderStub";

function Login() {
  return (
    <div className={styles.container}>
      <HeaderStub />
      <div className={styles.login}>login</div>
    </div>
  );
}

export default Login;
