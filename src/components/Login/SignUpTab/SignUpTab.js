import React from "react";
import styles from "./SignUpTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";
// import { createUser } from "../../../common/api/user";
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

  return (
    <Formik
      initialValues={{
        nickname: "",
        email: "",
        password: "",
        repeatPassword: ""
      }}
      validationSchema={signupSchema}
      onSubmit={values => {
        // signupSchema.validate(values).catch(err => console.log(err));
        signupSchema.isValid(values).then(valid => console.log(valid));
        // console.log(values);
      }}
      render={({ errors, touched }) => (
        <Form className={styles.container}>
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

export default injectIntl(SignUpTab);
