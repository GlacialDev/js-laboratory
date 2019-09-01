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
  const schema = yup.object().shape({
    nickname: yup
      .string()
      .min(6, "Too short")
      .required(),
    email: yup.string().email(),
    password: yup
      .string()
      .required("Password is Required.")
      .max(13, "Too long")
      .min(8, "Too short"),
    repeatPassword: yup
      .string()
      .required("Password is Required.")
      .max(13, "Too long")
      .min(8, "Too short"),
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
      onSubmit={values => {
        schema.validate(values).catch(err => console.log(err));
        schema.isValid(values).then(valid => console.log(valid));
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
          <button className={styles.button} type="submit">
            <FormattedMessage id="login.register_button" />
          </button>
        </Form>
      )}
    />
  );
}

export default injectIntl(SignUpTab);
