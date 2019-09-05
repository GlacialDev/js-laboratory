import React, { Component } from "react";
import Main from "./Main";
import { IntlProvider } from "react-intl";
import messages from "../../common/messages";
import {
  signInJWTRequest,
  refreshAccessTokenRequest
} from "../../common/api/user";
import jwt_decode from "jwt-decode";

import "normalize.css";
import "../../common/styles/universal.scss";
import styles from "./App.module.scss";

class App extends Component {
  componentDidMount() {
    const { context } = this.props;
    const { accessToken, refreshToken } = localStorage;

    if (accessToken && refreshToken) {
      const decodedAccessToken = jwt_decode(accessToken);
      let timeNow = new Date().getTime() / 1000;
      let accessTokenLifetimeEnd = new Date(decodedAccessToken.exp).getTime();

      if (accessTokenLifetimeEnd < timeNow) {
        refreshAccessTokenRequest(refreshToken).then(response => {
          this.saveNewTokenPair(response);
          signInJWTRequest(localStorage.accessToken).then(response => {
            this.signIn(response, context);
          });
        });
      } else {
        signInJWTRequest(accessToken).then(response => {
          this.signIn(response, context);
        });
      }
    }
  }

  saveNewTokenPair(response) {
    localStorage.accessToken = response.accessToken;
    localStorage.refreshToken = response.refreshToken;
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
