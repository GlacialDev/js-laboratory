import React from "react";
import styles from "./SignInTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import { Formik, Field, Form } from "formik";

function SignInTab({ intl }) {
  const nicknamePlaceholder = intl.formatMessage({
    id: "login.nickname_input"
  });
  const passwordPlaceholder = intl.formatMessage({
    id: "login.password_input"
  });
  const fields = [
    {
      type: "text",
      name: "nickname",
      placeholder: nicknamePlaceholder
    },
    {
      type: "password",
      name: "password",
      placeholder: passwordPlaceholder
    }
  ];

  return (
    <Formik
      initialValues={{
        nickname: "",
        password: ""
      }}
      onSubmit={values => {
        console.log(values);
      }}
      render={() => (
        <Form className={styles.container}>
          {fields.map(({ type, placeholder, name }, index) => (
            <Field
              className={styles.input}
              type={type}
              placeholder={placeholder}
              name={name}
              key={index}
              required
            />
          ))}
          <div className={styles.checkbox}>
            <Field
              id="login_checkbox"
              className={styles.checkbox_input}
              type="checkbox"
            />
            <label htmlFor="login_checkbox" className={styles.checkbox_label}>
              <FormattedMessage id="login.remember" />
            </label>
          </div>
          <button className={styles.button} type="submit">
            <FormattedMessage id="login.login_button" />
          </button>
        </Form>
      )}
    />
  );
}

export default injectIntl(SignInTab);
