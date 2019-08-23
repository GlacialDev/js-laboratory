import React, { Component } from "react";
import styles from "./About.module.scss";
import { ContextConsumer } from "../../common/context/Context";
import FirstSection from "./FirstSection";
import WorksSection from "./WorksSection";
import WelcomeSection from "./WelcomeSection";

class About extends Component {
  state = {
    count: 0,
    controls: []
  };
  sectionsRef = React.createRef();

  isScrolling = false;

  onWheel(e) {
    let { count } = this.state;
    let element = this.sectionsRef.current;
    let minScrollCount = -1;
    let maxScrollCount = -element.children.length + 2;

    if (this.isScrolling === false) {
      this.isScrolling = true;
      setTimeout(() => (this.isScrolling = false), 500);

      if (e.deltaY > 0) {
        // eslint-disable-next-line
        count < maxScrollCount ? (count = count) : (count = count - 1);
      } else {
        // eslint-disable-next-line
        count > minScrollCount ? (count = count) : (count = count + 1);
      }
    }

    this.setState({ count }, () => {
      element.style.transform = `translateY(${count * 100}%)`;
    });
  }

  onControlsClick(e) {
    let element = this.sectionsRef.current;
    let minScrollCount = -1;
    let maxScrollCount = -element.children.length + 2;

    if (e.target.dataset.scroll) {
      let count = +e.target.dataset.scroll;

      this.setState({ count }, () => {
        element.style.transform = `translateY(${count * 100}%)`;
      });
    }

    if (e.target.dataset.scroll_prev) {
      let { count } = this.state;
      // eslint-disable-next-line
      count > minScrollCount ? (count = count) : (count = count + 1);

      this.setState({ count }, () => {
        element.style.transform = `translateY(${count * 100}%)`;
      });
    }

    if (e.target.dataset.scroll_next) {
      let { count } = this.state;
      // eslint-disable-next-line
      count < maxScrollCount ? (count = count) : (count = count - 1);

      this.setState({ count }, () => {
        element.style.transform = `translateY(${count * 100}%)`;
      });
    }
  }

  renderControls() {
    let controls = [];
    for (let i = 0; i < this.sectionsRef.current.children.length; i++) {
      controls.push(-i);
    }
    this.setState({ controls: [...controls] });
  }

  componentDidMount() {
    this.renderControls();
  }

  render() {
    let { controls, count } = this.state;

    return (
      <div className={styles.About} onWheel={e => this.onWheel(e)}>
        <div className={styles.controls}>
          <div
            data-scroll_prev
            className={`${styles.controls_arrow} ${styles.controls_arrow_top}`}
            onClick={e => this.onControlsClick(e)}
          />
          <ul
            className={styles.controls_list}
            onClick={e => this.onControlsClick(e)}
          >
            {controls.map(i => (
              <li
                className={
                  count === i
                    ? styles.controls_item_active
                    : styles.controls_item
                }
                key={i}
                data-scroll={i}
              />
            ))}
          </ul>
          <div
            data-scroll_next
            className={`${styles.controls_arrow} ${
              styles.controls_arrow_bottom
            }`}
            onClick={e => this.onControlsClick(e)}
          />
          <ContextConsumer>
            {context => (
              <div
                className={styles.controls_theme}
                onClick={context.toggleTheme}
              >
                <svg
                  viewBox="0 0 20 20"
                  version="1.1"
                  className={styles.controls_theme_svg}
                >
                  <path d="M16.995 13.885c.112-.201-.1-.421-.317-.344A8 8 0 0 1 6.46 3.322c.078-.218-.143-.43-.344-.317a8 8 0 1 0 10.88 10.88z" />
                </svg>
              </div>
            )}
          </ContextConsumer>
          {/* <div className={styles.controls_lang}>
            <svg
              viewBox="0 0 20 20"
              version="1.1"
              className={styles.controls_lang_svg}
            >
              <path d="M13.156 15.097A10.703 10.703 0 0 0 14.36 11h1.557a6.004 6.004 0 0 1-2.76 4.097M4.096 11h1.557a10.725 10.725 0 0 0 1.206 4.1A6.007 6.007 0 0 1 4.097 11m2.76-6.097A10.702 10.702 0 0 0 5.654 9H4.097a6.006 6.006 0 0 1 2.76-4.097M12.403 9H7.61c.198-1.854.948-3.43 2.168-4.988.077-.003.152-.012.23-.012.075 0 .147.009.222.012C11.451 5.57 12.204 7.146 12.403 9m-2.167 6.989c-.077.003-.152.01-.229.01-.076 0-.148-.007-.223-.01-1.222-1.558-1.975-3.135-2.174-4.99h4.794c-.198 1.855-.948 3.432-2.168 4.99m5.681-6.99H14.36a10.704 10.704 0 0 0-1.207-4.098A6.003 6.003 0 0 1 15.917 9m2.096 1.014c0-.04-.009-.072-.01-.11C17.948 5.53 14.392 2 10.006 2 5.63 2 2.077 5.518 2.012 9.88 2.01 9.918 2 9.95 2 9.987c0 .039.01.072.011.11A7.998 7.998 0 0 0 10.007 18c4.378 0 7.93-3.518 7.994-7.882.002-.036.012-.067.012-.104" />
            </svg>
          </div> */}
        </div>
        <div className={styles.sections} ref={this.sectionsRef}>
          <WelcomeSection scrollControl={this.onControlsClick.bind(this)} />
          <FirstSection />
          <WorksSection />
        </div>
      </div>
    );
  }
}

export default About;
