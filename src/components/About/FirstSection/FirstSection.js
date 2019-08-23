import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./FirstSection.module.scss";
import HeaderStub from "../../Header/HeaderStub";
import avatar from "./avatar.jpg";
import svgsprite from "./sprite.svg";

function FirstSection() {
  let skills = [
    "HTML5",
    "pug",
    "CSS3",
    "Sass",
    "JS ES7",
    "Webpack",
    "React",
    "Redux",
    "Vue",
    "Node.js",
    "express.js",
    "MongoDB",
    "git",
    "VSCode",
    "Photoshop"
  ];

  return (
    <section className={styles.first}>
      <HeaderStub />
      <div className={styles.first_content}>
        <img className={styles.first_photo} src={avatar} alt="" />
        <div className={styles.first_text}>
          <div className={styles.first_header_text}>
            <FormattedMessage id="first.whoQuestion" />
          </div>
          <div className={styles.first_main_text}>
            <FormattedMessage id="first.whoAnswer" />
          </div>
          <div className={styles.first_header_text}>
            <FormattedMessage id="first.whatQuestion" />
          </div>
          <div className={styles.first_main_text}>
            <FormattedMessage id="first.whatAnswer" />
          </div>
          <div className={styles.first_header_text}>
            <FormattedMessage id="first.techQuestion" />
          </div>
          <div className={styles.first_main_text}>
            <ul className={styles.first_skills_list}>
              {skills.map((item, i) => (
                <li className={styles.first_skills_item} key={i}>
                  <svg className={styles.first_svg}>
                    <use xlinkHref={`${svgsprite}#${item}`} />
                  </svg>
                  <div className={styles.first_svg_text}>{item}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FirstSection;
