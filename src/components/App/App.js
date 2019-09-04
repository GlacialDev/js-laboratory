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
    // Клиент(фронтенд) проверяет перед запросом не истекло ли время жизни access token'на
    const { accessToken, refreshToken } = localStorage;
    const decodedAccessToken = jwt_decode(accessToken);
    const timeNow = new Date().getTime();

    if (decodedAccessToken.exp < timeNow) {
      // // Если истекло клиент отправляет на auth/refresh-token URL refresh token
      // // https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc
      // // написать refreshAccessTokenRequest
      // refreshAccessTokenRequest(refreshToken)
      //   .then(response => {
      //     // написать savenNewTokenPair
      //     this.saveNewTokenPair(response);
      //   })
      //   .then(accessToken => {
      //     signInJWTRequest(accessToken).then(response =>
      //       this.signIn(response, context)
      //     );
      //   });
    } else {
      signInJWTRequest(accessToken).then(response =>
        this.signIn(response, context)
      );
    }

    // if (token && token !== "") {
    //   var decoded = jwt_decode(token);
    //   const date = new Date().getTime();
    //   console.log(date);
    //   console.log(decoded.exp);
    // signInJWTRequest({ token }).then(response =>
    //   this.signIn(response, context)
    // );
    // }
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
