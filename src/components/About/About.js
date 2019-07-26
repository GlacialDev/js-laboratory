import React from "react";
import "./About.css";

function About(props) {
  return (
    <div className="About">
      <style>{props.appStyle}</style>
      <div>about</div>
    </div>
  );
}

export default About;
