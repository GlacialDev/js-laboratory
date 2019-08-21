import React, { Component } from "react";
import HeaderStub from "../../Header/HeaderStub";
import styles from "./HelloSection.module.scss";
import rawStyleText from "./rawStyleText";
import LocaleButton from "./LocaleButton";
import ThemeButton from "./ThemeButton";
import { FormattedMessage } from "react-intl";

class HelloSection extends Component {
  // не нашел способа лучше автоматически скроллить вниз окно с текстом
  screenRef = React.createRef();

  state = {
    styleTextBuffer: "",
    styleText: "",
    markupText: ""
  };

  async writeNextChar(rawStyleText, options) {
    let { charIndex, timeInterval } = options;
    let {
      styleText,
      markupText,
      styleTextBuffer,
      progress,
      remote
    } = this.state;

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
      if (remote !== true) {
        await new Promise(resolve =>
          setTimeout(() => resolve(), _timeInterval)
        );
      }

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
      timeInterval: 35
    });
  }

  componentDidUpdate() {
    let element = this.screenRef.current;
    element.scrollTop = element.scrollHeight;
  }

  render() {
    const { styleText, markupText } = this.state;

    return (
      <section className={styles.hello}>
        <HeaderStub />
        <div className={`${styles.hello_container} container`}>
          <style>{styleText}</style>
          <div
            ref={this.screenRef}
            className={`${styles.hello_interactive} screen`}
            id="screen"
            dangerouslySetInnerHTML={this.createMarkup(markupText)}
          />
          <div className={`${styles.hello_settings} settings`}>
            <div className={`${styles.hello_settings_text_head} buttons`}>
              <FormattedMessage id="hello.settings" />
            </div>
            <div className={`${styles.hello_settings_text} buttons`}>
              <FormattedMessage id="hello.darkTheme" />
            </div>
            <ThemeButton className="buttons" />
            <div className={`${styles.hello_settings_text} buttons`}>
              <FormattedMessage id="hello.lang" />
            </div>
            <LocaleButton className="buttons" />
          </div>
        </div>
      </section>
    );
  }
}

export default HelloSection;
