import React from "react";
import styles from "./SignInTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import { Formik, Field, Form } from "formik";
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

  return (
    <Formik
      initialValues={{
        nickname: "",
        password: "",
        remember: false
      }}
      validationSchema={signinSchema}
      onSubmit={values => {
        // signupSchema.validate(values).catch(err => console.log(err));
        signinSchema.isValid(values).then(valid => console.log(valid));
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

export default injectIntl(SignInTab);
