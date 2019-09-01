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
  const schema = yup.object().shape({
    nickname: yup
      .string()
      .min(6, "Too short")
      .required(),
    password: yup
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
        password: ""
      }}
      onSubmit={values => {
        schema.validate(values).catch(err => console.log(err));
        schema.isValid(values).then(valid => console.log(valid));
      }}
      render={() => (
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
              {/* <div>
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div> */}
            </React.Fragment>
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
