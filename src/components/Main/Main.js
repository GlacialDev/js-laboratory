import React, { PureComponent } from "react";
import "./Main.scss";
import rawStyleText from "./rawStyleText";
import Sidebar from "./Sidebar";

class Main extends PureComponent {
  // не нашел способа лучше автоматически скроллить вниз окно с текстом
  screenRef = React.createRef();

  state = {
    styleTextBuffer: "",
    styleText: "",
    markupText: "",
    progress: "continue"
  };

  async writeNextChar(rawStyleText, options) {
    let { charIndex, timeInterval } = options;
    let { styleText, markupText, styleTextBuffer, progress } = this.state;

    console.log(progress);

    if (progress === "pause") {
      await new Promise(resolve => setTimeout(() => resolve(), 300));

      this.writeNextChar(rawStyleText, {
        charIndex: charIndex,
        timeInterval
      });

      return;
    }

    let newCharIndex = charIndex + 1;
    let char = rawStyleText.slice(charIndex, newCharIndex);

    let styleCurrentState = this.processStyleText(
      styleText,
      styleTextBuffer,
      char
    );
    styleText = styleCurrentState.styleText;
    styleTextBuffer = styleCurrentState.styleTextBuffer;

    markupText = this.processMarkupText(markupText, char);
    await this.setState({
      styleTextBuffer,
      styleText,
      markupText
    });

    let _timeInterval = timeInterval;
    if (char === "." || char === "," || char === ";") {
      _timeInterval = timeInterval * 5;
    }

    if (newCharIndex < rawStyleText.length) {
      await new Promise(resolve => setTimeout(() => resolve(), _timeInterval));

      this.writeNextChar(rawStyleText, {
        charIndex: newCharIndex,
        timeInterval
      });
    }
  }

  processMarkupText(markupText, char) {
    let selectorRegexp = /(.*)$/;
    let keyRegexp = /([a-zA-Z- ^\n]*)$/;
    let valueRegexp = /([^:]*)$/;
    let commentRegexp = /(\/\*(?:[^](?!\/\*))*\*\/)$/g;

    if (char === "{") {
      markupText = markupText.replace(
        selectorRegexp,
        '<span class="selector">$1</span>'
      );
      markupText += char;
    } else if (char === ":") {
      markupText = markupText.replace(keyRegexp, '<span class="key">$1</span>');
      markupText += char;
    } else if (char === ";") {
      markupText = markupText.replace(
        valueRegexp,
        '<span class="value">$1</span>'
      );
      markupText += char;
    } else if (char === "/") {
      markupText += char;
      markupText = markupText.replace(
        commentRegexp,
        '<span class="comment">$1</span>'
      );
    } else if (char === "~") {
      // console.log("~");
    } else {
      markupText += char;
    }

    return markupText;
  }

  processStyleText(styleText, styleTextBuffer, char) {
    styleTextBuffer += char;

    if (char === ";") {
      styleText += styleTextBuffer;
      styleTextBuffer = "";
    }

    return {
      styleText,
      styleTextBuffer
    };
  }

  createMarkup(rawMarkup) {
    return { __html: rawMarkup };
  }

  componentDidMount() {
    this.writeNextChar(rawStyleText, {
      charIndex: 0,
      timeInterval: 10
    });
  }

  componentDidUpdate() {
    let element = this.screenRef.current;
    element.scrollTop = element.scrollHeight;
  }

  controlsClickHandler(event) {
    let btn = event.target.classList[1];
    console.log(btn);

    if (btn === "pause" || btn === "continue") {
      event.target.classList.toggle("pause");
      event.target.classList.toggle("continue");

      this.setState({
        progress: btn === "pause" ? "pause" : "continue"
      });
    }
  }

  render() {
    const { styleText, markupText } = this.state;

    return (
      <div className="Container">
        <div className="Controls">
          <div
            className="Controls_btn pause"
            onClick={this.controlsClickHandler.bind(this)}
          >
            {this.state.progress === "continue" ? "Pause" : "Continue"}
          </div>
          <div
            className="Controls_btn remote"
            onClick={this.controlsClickHandler.bind(this)}
          >
            Remote
          </div>
        </div>
        <div ref={this.screenRef} className="Main">
          <style>{styleText}</style>
          <div
            id="screen"
            dangerouslySetInnerHTML={this.createMarkup(markupText)}
          />
        </div>
        <Sidebar />
      </div>
    );
  }
}

export default Main;
