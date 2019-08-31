import React from "react";
import styles from "./ErrorPage.module.scss";
import HeaderStub from "../Header/HeaderStub";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <HeaderStub />
      <div className={styles.error}>error 404 страница не найдена</div>
    </div>
  );
}

export default ErrorPage;
