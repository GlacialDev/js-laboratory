import React, { Component } from "react";
import styles from "./About.module.scss";
import HeaderStub from "../Header/HeaderStub";
import avatar from "./avatar.jpg";

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

    if (e.target.dataset.scroll) {
      let count = +e.target.dataset.scroll;

      this.setState({ count }, () => {
        element.style.transform = `translateY(${count * 100}%)`;
      });
    }
  }

  componentDidMount() {
    let controls = [];
    for (let i = 0; i < this.sectionsRef.current.children.length; i++) {
      controls.push(-i);
    }
    this.setState({ controls: [...controls] });
  }

  render() {
    let { controls, count } = this.state;

    return (
      <div className={styles.About} onWheel={e => this.onWheel(e)}>
        <div className={styles.controls}>
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
        </div>
        <div className={styles.sections} ref={this.sectionsRef}>
          <section className={styles.section + " " + styles.first}>
            <HeaderStub />
            <div className={styles.first_content}>
              <img className={styles.first_photo} src={avatar} alt="Мое фото" />
              <div className={styles.first_text} />
            </div>
          </section>
          <section className={styles.section + " " + styles.first}>
            <HeaderStub />
            <div className={styles.first_content}>
              <img className={styles.first_photo} src={avatar} alt="Мое фото" />
              <div className={styles.first_text} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default About;
