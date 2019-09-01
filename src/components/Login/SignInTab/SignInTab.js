import React, { Component } from "react";
import styles from "./SignInTab.module.scss";
import { injectIntl, FormattedMessage } from "react-intl";

class SignInTab extends Component {
  state = {
    values: {
      nickname: "",
      password: ""
    },
    remember: false
  };

  handleChange = event => {
    const { values } = this.state;
    this.setState({
      values: { ...values, [event.target.name]: event.target.value }
    });
  };

  handleCheckbox = event => {
    this.setState({ remember: event.target.checked });
  };

  render() {
    let { values, remember } = this.state;
    let { intl } = this.props;
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
        <div className={styles.checkbox}>
          <input
            id="login_checkbox"
            className={styles.checkbox_input}
            type="checkbox"
            checked={remember}
            onChange={this.handleCheckbox}
          />
          <label htmlFor="login_checkbox" className={styles.checkbox_label}>
            <FormattedMessage id="login.remember" />
          </label>
        </div>
        <button className={styles.button}>
          <FormattedMessage id="login.login_button" />
        </button>
      </div>
    );
  }
}

export default injectIntl(SignInTab);
