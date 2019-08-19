import React, { Component } from "react";

const Context = React.createContext();

export class ContextProvider extends Component {
  state = {
    theme: "light",
    locale: "ru"
  };

  toggleTheme() {
    let { theme } = this.state;
    this.setState({
      theme: theme === "light" ? (theme = "dark") : (theme = "light")
    });
  }

  toggleLocale() {
    let { locale } = this.state;
    this.setState({
      locale: locale === "ru" ? (locale = "en") : (locale = "ru")
    });
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          toggleTheme: this.toggleTheme.bind(this),
          toggleLocale: this.toggleLocale.bind(this)
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
