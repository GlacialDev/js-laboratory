import React, { useState } from "react";
import styles from "./SignUpTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import { createUser } from "../../../common/api/user";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

function SignUpTab({ intl }) {
  const nicknamePlaceholder = intl.formatMessage({
    id: "login.nickname_input"
  });
  const emailPlaceholder = intl.formatMessage({
    id: "login.email_input"
  });
  const passwordPlaceholder = intl.formatMessage({
    id: "login.password_input"
  });
  const repeatPasswordPlaceholder = intl.formatMessage({
    id: "login.repeat_password_input"
  });
  const nicknameError = intl.formatMessage({
    id: "error.nickname_error"
  });
  const emailError = intl.formatMessage({
    id: "error.email_error"
  });
  const emailIncorrectError = intl.formatMessage({
    id: "error.email_incorrect_error"
  });
  const passwordError = intl.formatMessage({
    id: "error.password_error"
  });
  const repeatPasswordError = intl.formatMessage({
    id: "error.repeat_password_error"
  });
  const tooShortError = intl.formatMessage({
    id: "error.too_short_error"
  });
  const tooLongError = intl.formatMessage({
    id: "error.too_long_error"
  });
  const signupErrorCodes = {
    "1000": intl.formatMessage({
      id: "error.code_1000"
    }),
    "1001": intl.formatMessage({
      id: "error.code_1001"
    }),
    "1002": intl.formatMessage({
      id: "error.code_1002"
    }),
    default: intl.formatMessage({
      id: "error.code_default"
    })
  };
  const fields = [
    {
      type: "text",
      name: "nickname",
      placeholder: nicknamePlaceholder
    },
    {
      type: "email",
      name: "email",
      placeholder: emailPlaceholder
    },
    {
      type: "password",
      name: "password",
      placeholder: passwordPlaceholder
    },
    {
      type: "password",
      name: "repeatPassword",
      placeholder: repeatPasswordPlaceholder
    }
  ];
  const signupSchema = yup.object().shape({
    nickname: yup
      .string()
      .min(6, tooShortError + "6")
      .required(nicknameError)
      .trim(),
    email: yup
      .string()
      .email(emailIncorrectError)
      .required(emailError)
      .trim(),
    password: yup
      .string()
      .max(30, tooLongError + "30")
      .min(8, tooShortError + "8")
      .required(passwordError)
      .trim(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], repeatPasswordError)
      .required(passwordError)
      .trim(),
    createdOn: yup.date().default(function() {
      return new Date();
    })
  });
  const [serverAnswerCode, setServerAnswerCode] = useState(0);

  return (
    <Formik
      initialValues={{
        nickname: "",
        email: "",
        password: "",
        repeatPassword: ""
      }}
      validationSchema={signupSchema}
      onSubmit={data => {
        signupSchema.isValid(data).then(valid => {
          if (valid) {
            createUser(data).then(response => {
              setServerAnswerCode(response.answer.code);
            });
          }
        });
      }}
      render={({ errors, touched }) => (
        <Form className={styles.container}>
          <div
            className={
              serverAnswerCode === "1000" ? styles.success : styles.error
            }
          >
            {serverAnswerCode
              ? renderServerAnswer(serverAnswerCode, signupErrorCodes)
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
          <button className={styles.button} type="submit">
            <FormattedMessage id="login.register_button" />
          </button>
        </Form>
      )}
    />
  );
}

function renderServerAnswer(arg, messages) {
  let text = "";

  switch (arg) {
    case "1000":
      text = messages[arg];
      break;
    case "1001":
      text = messages[arg];
      break;
    case "1002":
      text = messages[arg];
      break;
    default:
      text = messages["default"];
      break;
  }

  return (
    <div className={arg === "1000" ? styles.success_text : styles.error_text}>
      {text}
      {arg === "1000" ? (
        <NavLink
          to={`/login`}
          className={styles.login_navbar_link}
          activeClassName={styles.login_navbar_link_active}
        >
          <FormattedMessage id="login.login" />
        </NavLink>
      ) : null}
    </div>
  );
}

export default injectIntl(SignUpTab);
