import React, { Component } from "react";
import styles from "./RegistrationTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";

class RegistrationTab extends Component {
  state = {
    values: {
      nickname: "",
      email: "",
      password: "",
      repeatPassword: ""
    }
  };

  handleChange = event => {
    const { values } = this.state;
    this.setState({
      values: { ...values, [event.target.name]: event.target.value }
    });
  };

  render() {
    let { values } = this.state;
    let { intl } = this.props;
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
        type: "text",
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

    return (
      <div className={styles.container}>
        {fields.map(({ type, placeholder, name }, index) => (
          <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            name={name}
            value={values[name]}
            onChange={this.handleChange}
            key={index}
          />
        ))}
        <button className={styles.button}>
          <FormattedMessage id="login.register_button" />
        </button>
      </div>
    );
  }
}

export default injectIntl(RegistrationTab);
