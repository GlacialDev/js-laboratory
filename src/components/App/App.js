import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import { ContextProvider, ContextConsumer } from "../../common/context/Context";
import { IntlProvider } from "react-intl";
import messages from "../../common/messages";

import "normalize.css";
import "../../common/styles/universal.scss";
import styles from "./App.module.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <ContextProvider>
          <ContextConsumer>
            {context => (
              <IntlProvider
                locale={context.state.locale}
                messages={messages[context.state.locale]}
              >
                <div className={styles.App} data-theme={context.state.theme}>
                  <Main />
                </div>
              </IntlProvider>
            )}
          </ContextConsumer>
        </ContextProvider>
      </Router>
    );
  }
}

export default App;
