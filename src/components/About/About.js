import React, { Component } from "react";
import styles from "./About.module.scss";
import HeaderStub from "../Header/HeaderStub";
import avatar from "./avatar.jpg";
import html5svg from "./svg/HTML5.svg";
import pugsvg from "./svg/pug.svg";
import css3svg from "./svg/CSS3.svg";
import sasssvg from "./svg/sass.svg";
import jssvg from "./svg/JS.svg";
import webpacksvg from "./svg/Webpack.svg";
import reactsvg from "./svg/react.svg";
import reduxsvg from "./svg/redux.svg";
import vuesvg from "./svg/Vue.svg";
import nodesvg from "./svg/Node.svg";
import expresssvg from "./svg/expressjs.svg";
import mongodbsvg from "./svg/mongodb.svg";
import gitsvg from "./svg/git.svg";
import photoshopsvg from "./svg/photoshop.svg";
import vscodesvg from "./svg/vscode.svg";

class About extends Component {
  state = {
    count: 0,
    controls: []
  };
  sectionsRef = React.createRef();

  isScrolling = false;
  skills = [
    ["HTML5", html5svg],
    ["pug", pugsvg],
    ["CSS3", css3svg],
    ["Sass", sasssvg],
    ["JS ES6/7", jssvg],
    ["Webpack", webpacksvg],
    ["React", reactsvg],
    ["Redux", reduxsvg],
    ["Vue", vuesvg],
    ["Node.js", nodesvg],
    ["express.js", expresssvg],
    ["MongoDB", mongodbsvg],
    ["git", gitsvg],
    ["VSCode", vscodesvg],
    ["Photoshop", photoshopsvg]
  ];

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
              <div className={styles.first_text}>
                <div className={styles.first_header_text}>Кто я?</div>
                <div className={styles.first_main_text}>
                  Меня зовут Клименко Иван. Я веб-разработчик из
                  Санкт-Петербурга.
                </div>
                <div className={styles.first_header_text}>Что умею?</div>
                <div className={styles.first_main_text}>
                  Специализируюсь на фронтенде. Однако знаком также и с
                  бекенд-разработкой.
                </div>
                <div className={styles.first_header_text}>
                  Какими технологиями владею?
                </div>
                <div className={styles.first_main_text}>
                  <ul className={styles.first_skills_list}>
                    {this.skills.map((item, i) => (
                      <li className={styles.first_skills_item} key={i}>
                        <img
                          src={item[1]}
                          className={styles.first_svg}
                          alt={item[0]}
                        />
                        <div className={styles.first_svg_text}>{item[0]}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
