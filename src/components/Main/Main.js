import React, { PureComponent } from "react";
import "./Main.css";
import rawStyleText from "./rawStyleText";

class Main extends PureComponent {
  screenRef = React.createRef();

  state = {
    styleTextBuffer: "",
    styleText: "",
    markupText: ""
  };

  async writeNextChar(rawStyleText, options) {
    let { charIndex, timeInterval } = options;
    let { styleText, markupText, styleTextBuffer } = this.state;

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
      console.log("~");
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

  render() {
    const { styleText, markupText } = this.state;

    return (
      <div ref={this.screenRef} className="Screen">
        <style>{styleText}</style>
        <div id="screen" dangerouslySetInnerHTML={createMarkup(markupText)} />
      </div>
    );
  }
}

function createMarkup(rawMarkup) {
  return { __html: rawMarkup };
}

export default Main;
