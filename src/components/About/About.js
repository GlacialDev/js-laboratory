import React from "react";
import commonStyles from "../../common/commonStyles.js";
import "./About.css";

function About() {
  return (
    <div className="About">
      {/* Костыль, который возник из-за интерактивного добавления стилей на главной */}
      <style>{commonStyles}</style>
      {/* Без этого костыля, если просто импортировать стили, они отображаются на главной сразу, а не в нужный момент */}
      <div />
    </div>
  );
}

export default About;
