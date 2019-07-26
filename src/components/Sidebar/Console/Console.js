import React, { PureComponent } from "react";
import "./Console.css";
import getConsoleAnswer from "./getConsoleAnswer";

class Console extends PureComponent {
  consoleRef = React.createRef();

  state = {
    consoleInput: "",
    messageHistory: [
      {
        author: "console",
        text: "Введите help чтобы получить информацию о доступных командах"
      }
    ]
  };

  onChangeInput = event => {
    this.setState({ consoleInput: event.target.value });
  };

  onKeyPress = event => {
    if (event.key === "Enter") {
      let userMessage = event.target.value;
      let messageHistory = this.state.messageHistory;
      let answer = getConsoleAnswer(userMessage);

      messageHistory = [
        ...messageHistory,
        {
          author: "user",
          text: "> " + userMessage
        },
        answer
      ];

      this.setState({
        consoleInput: "",
        messageHistory
      });
    }
  };

  componentDidUpdate() {
    let element = this.consoleRef.current;
    element.scrollTop = element.scrollHeight;
  }

  render() {
    const { messageHistory } = this.state;

    return (
      <div className="Console">
        <div className="console-window" ref={this.consoleRef}>
          {messageHistory.map((item, index) => (
            <pre className={"console-window-text-" + item.author} key={index}>
              {item.text}
            </pre>
          ))}
        </div>
        <input
          className="console-input"
          value={this.state.consoleInput}
          onChange={this.onChangeInput}
          onKeyPress={this.onKeyPress}
          placeholder="Введите сообщение..."
        />
      </div>
    );
  }
}

export default Console;
