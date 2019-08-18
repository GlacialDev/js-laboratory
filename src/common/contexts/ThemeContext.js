import React, { Component } from "react";

const ThemeContext = React.createContext();

export class ThemeProvider extends Component {
  state = {
    theme: "light"
  };

  toggleTheme() {
    let { theme } = this.state;
    this.setState({
      theme: theme === "light" ? (theme = "dark") : (theme = "light")
    });
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{
          state: this.state,
          toggleTheme: this.toggleTheme.bind(this)
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export function ThemeConsumer(props) {
  return <ThemeContext.Consumer>{props.children}</ThemeContext.Consumer>;
}
