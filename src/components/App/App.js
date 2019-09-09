import React, { Component } from "react";
import Main from "./Main";
import { IntlProvider } from "react-intl";
import messages from "../../common/messages";

import "normalize.css";
import "../../common/styles/universal.scss";
import styles from "./App.module.scss";

class App extends Component {
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
