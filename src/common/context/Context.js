import React, { Component } from "react";

const Context = React.createContext();

function cookieParse() {
  let cookieObject = document.cookie.split("; ").reduce((prev, current) => {
    const [name, value] = current.split("=");

    prev[name] = value;

    return prev;
  }, {});

  return cookieObject;
}

function getCookieValue(name) {
  let cookieObj = cookieParse();
  return cookieObj[name];
}

function setCookie(name, value, options) {
  if (name.trim() === "") {
    return;
  }

  options = options || {};

  let expires = options.expires;

  if (typeof expires == "number" && expires) {
    let d = new Date();

    d.setTime(d.getTime() + expires * 365 * 24 * 64 * 60 * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (let propName in options) {
    if (propName) {
      updatedCookie += "; " + propName;
      let propValue = options[propName];

      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
  }

  document.cookie = updatedCookie;
}

export class ContextProvider extends Component {
  stateTheme = getCookieValue("theme");
  stateLocale = getCookieValue("locale");

  state = {
    theme: this.stateTheme ? this.stateTheme : "light",
    locale: this.stateLocale ? this.stateLocale : "ru",
    nickname: "",
    email: "",
    isAuth: false
  };

  toggleTheme() {
    let { theme } = this.state;
    theme === "light" ? (theme = "dark") : (theme = "light");
    this.setState({
      theme
    });
    setCookie("theme", theme, { expires: 10 });
  }

  toggleLocale() {
    let { locale } = this.state;
    locale === "ru" ? (locale = "en") : (locale = "ru");
    this.setState({
      locale
    });
    setCookie("locale", locale, { expires: 10 });
  }

  setNickname(value) {
    this.setState({
      nickname: value
    });
  }

  setEmail(value) {
    this.setState({
      email: value
    });
  }

  setIsAuth(value) {
    this.setState({
      isAuth: value
    });
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          toggleTheme: this.toggleTheme.bind(this),
          toggleLocale: this.toggleLocale.bind(this),
          setNickname: this.setNickname.bind(this),
          setEmail: this.setEmail.bind(this),
          setIsAuth: this.setIsAuth.bind(this)
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export function ContextConsumer(props) {
  return <Context.Consumer>{props.children}</Context.Consumer>;
}
