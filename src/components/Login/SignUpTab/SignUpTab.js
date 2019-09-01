import React, { Component } from "react";
import styles from "./SignUpTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import { createUser } from "../../../common/api/user";

class SignUpTab extends Component {
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

  handleButton = async event => {
    const { nickname, email, password } = this.state.values;
    let req = await createUser("/api/user/create", {
      nickname,
      email,
      password
    });

    console.log(req);
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
            required
          />
        ))}
        <button className={styles.button} onClick={this.handleButton}>
          <FormattedMessage id="login.register_button" />
        </button>
      </div>
    );
  }
}

export default injectIntl(SignUpTab);
