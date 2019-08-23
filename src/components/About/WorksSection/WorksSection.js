import React from "react";
import styles from "./WorksSection.module.scss";
import HeaderStub from "../../Header/HeaderStub";
import TinySlider from "tiny-slider-react";

function WorksSection() {
  let imgs = [
    "http://d2ji2mue1p384z.cloudfront.net/img/480x360/162951.jpg",
    "http://d2ji2mue1p384z.cloudfront.net/img/480x360/162465.jpg",
    "http://d2ji2mue1p384z.cloudfront.net/img/480x360/220048.jpg"
  ];
  const loadingImage =
    "data:image/gif;base64,\
  R0lGODlhAQABAPAAAMzMzAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
  const settings = {
    lazyload: true,
    nav: true,
    // mouseDrag: true,
    loop: true,
    items: 1
  };

  return (
    <section className={styles.hello}>
      <HeaderStub />
      <TinySlider settings={settings}>
        {imgs.map((el, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              className={`tns-lazy-img`}
              src={loadingImage}
              data-src={el}
              alt=""
            />
          </div>
        ))}
      </TinySlider>
    </section>
  );
}

export default WorksSection;
