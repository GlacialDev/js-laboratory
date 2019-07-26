import React from "react";
import "./MyWorks.css";

function MyWorks(props) {
  return (
    <div className="MyWorks">
      <style>{props.appStyle}</style>
      <div>works</div>
    </div>
  );
}

export default MyWorks;
