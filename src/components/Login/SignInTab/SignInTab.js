import React, { useState } from "react";
import styles from "./SignInTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import { Redirect } from "react-router";
import { Formik, Field, Form } from "formik";
import { signIn } from "../../../common/api/user";
import * as yup from "yup";

function SignInTab({ intl }) {
  const nicknamePlaceholder = intl.formatMessage({
    id: "login.nickname_input"
  });
  const passwordPlaceholder = intl.formatMessage({
    id: "login.password_input"
  });
  const nicknameError = intl.formatMessage({
    id: "error.nickname_error"
  });
  const passwordError = intl.formatMessage({
    id: "error.password_error"
  });
  const signinErrorCodes = {
    "1003": intl.formatMessage({
      id: "error.code_1003"
    }),
    "1004": intl.formatMessage({
      id: "error.code_1004"
    })
  };
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
  const signinSchema = yup.object().shape({
    nickname: yup
      .string()
      .required(nicknameError)
      .trim(),
    password: yup
      .string()
      .required(passwordError)
      .trim(),
    remember: yup
      .boolean()
      .default(false)
      .notRequired()
  });
  const [serverAnswerCode, setServerAnswerCode] = useState(0);

  return (
    <Formik
      initialValues={{
        nickname: "",
        password: "",
        remember: false
      }}
      validationSchema={signinSchema}
      onSubmit={data => {
        signinSchema.isValid(data).then(valid => {
          if (valid) {
            signIn(data).then(response => {
              setServerAnswerCode(response.answer.code);
              localStorage.token = response.token;
            });
          }
        });
      }}
      render={({ errors, touched }) => (
        <Form className={styles.container}>
          <div className={serverAnswerCode === "success" ? null : styles.error}>
            {serverAnswerCode
              ? renderServerAnswer(serverAnswerCode, signinErrorCodes)
              : null}
          </div>
          {fields.map(({ type, placeholder, name }, index) => (
            <React.Fragment key={index}>
              <Field
                className={styles.input}
                type={type}
                placeholder={placeholder}
                name={name}
                key={index}
                required
              />
              <div className={styles.error}>
                {errors[name] && touched[name] ? (
                  <div className={styles.error_text}>{errors[name]}</div>
                ) : null}
              </div>
            </React.Fragment>
          ))}
          <div className={styles.checkbox}>
            <Field
              name="remember"
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

function renderServerAnswer(arg, messages) {
  let text = "";

  switch (arg) {
    case "1003":
      text = messages[arg];
      break;
    case "1004":
      text = messages[arg];
      break;
    default:
      break;
  }

  return (
    <div className={styles.error_text}>
      {text}
      {arg === "success" ? <Redirect to="/" /> : null}
    </div>
  );
}

export default injectIntl(SignInTab);
