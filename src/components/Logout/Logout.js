import React from "react";
import styles from "./Logout.module.scss";
import { ContextConsumer } from "../../common/context/Context";
import { Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import { logOutRequest } from "../../common/api/user";

function Logout({ intl }) {
  const textAuthorizedAs = intl.formatMessage({
    id: "logout.you_authorized_as"
  });
  const textWantToLogout = intl.formatMessage({
    id: "logout.want_to_logout"
  });

  function logout(context) {
    context.setNickname("");
    context.setEmail("");
    context.setIsAuth(false);
  }

  return (
    <ContextConsumer>
      {context =>
        context.state.isAuth === true ? (
          <div className={styles.container}>
            <div className={styles.logout}>
              <div className={styles.logout_text}>
                {`${textAuthorizedAs} ${context.state.nickname}`}
              </div>
              <button
                type="button"
                className={styles.logout_button}
                onClick={() => logOutRequest().then(() => logout(context))}
              >
                {textWantToLogout}
              </button>
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    </ContextConsumer>
  );
}

export default injectIntl(Logout);
