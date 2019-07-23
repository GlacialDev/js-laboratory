import React from "react";
import commonStyles from "../../common/commonStyles.js";
import "./MyWorks.css";

function MyWorks() {
  return (
    <div className="MyWorks">
      {/* Костыль, который возник из-за интерактивного добавления стилей на главной */}
      <style>{commonStyles}</style>
      {/* Без этого костыля, если просто импортировать стили, они отображаются на главной сразу, а не в нужный момент */}
    </div>
  );
}

export default MyWorks;
