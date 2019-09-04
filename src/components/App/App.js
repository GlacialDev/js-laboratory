import React, { Component } from "react";
import Main from "./Main";
import { IntlProvider } from "react-intl";
import messages from "../../common/messages";
import { signInJWTRequest } from "../../common/api/user";

import "normalize.css";
import "../../common/styles/universal.scss";
import styles from "./App.module.scss";

class App extends Component {
  componentDidMount() {
    const { context } = this.props;
    const token = localStorage.token;

    if (token && token !== "") {
      signInJWTRequest({ token }).then(response =>
        this.signIn(response, context)
      );
    }
  }

  signIn(response, context) {
    const { nickname, email, isAuth } = response.answer;
    context.setNickname(nickname);
    context.setEmail(email);
    context.setIsAuth(isAuth);
  }

  render() {
    const { context } = this.props;

    return (
      <IntlProvider
        locale={context.state.locale}
        messages={messages[context.state.locale]}
      >
        <div className={styles.App} data-theme={context.state.theme}>
          <Main />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
