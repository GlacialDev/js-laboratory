import React, { useState } from "react";
import styles from "./SignInTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import { Redirect } from "react-router";
import { Formik, Field, Form } from "formik";
import { signInRequest } from "../../../common/api/user";
import * as yup from "yup";
import { ContextConsumer } from "../../../common/context/Context";

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
      .trim()
  });
  const [serverAnswerCode, setServerAnswerCode] = useState(0);

  function renderServerAnswer(arg) {
    let text = "";

    switch (arg) {
      case "1003":
        text = signinErrorCodes[arg];
        break;
      case "1004":
        text = signinErrorCodes[arg];
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

  function signIn(response, context) {
    setServerAnswerCode(response.answer.code);
    context.setNickname(response.answer.nickname);
    context.setEmail(response.answer.email);
    context.setIsAuth(response.answer.isAuth);
    localStorage.accessToken = response.accessToken;
    localStorage.refreshToken = response.refreshToken;
  }

  return (
    <ContextConsumer>
      {context => (
        <Formik
          initialValues={{
            nickname: "",
            password: ""
          }}
          validationSchema={signinSchema}
          onSubmit={data => {
            signinSchema.isValid(data).then(valid => {
              if (valid) {
                signInRequest(data).then(response => {
                  signIn(response, context);
                });
              }
            });
          }}
          render={({ errors, touched }) => (
            <Form className={styles.container}>
              <div
                className={serverAnswerCode === "success" ? null : styles.error}
              >
                {serverAnswerCode ? renderServerAnswer(serverAnswerCode) : null}
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
              <button className={styles.button} type="submit">
                <FormattedMessage id="login.login_button" />
              </button>
            </Form>
          )}
        />
      )}
    </ContextConsumer>
  );
}

export default injectIntl(SignInTab);
