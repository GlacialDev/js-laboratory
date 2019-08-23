import React from "react";
import styles from "./WorksSection.module.scss";
import HeaderStub from "../../Header/HeaderStub";
import Slider from "react-slick";
import img1 from "./imgs/1.jpg";
import img2 from "./imgs/2.jpg";
import img3 from "./imgs/3.jpeg";
import img4 from "./imgs/4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../common/styles/slider.scss";
import { FormattedMessage } from "react-intl";

function WorksSection() {
  return (
    <section className={styles.works}>
      <HeaderStub />
      <div className={styles.works_content}>
        <div className={styles.works_header}>
          <FormattedMessage id="works.header" />
        </div>
        <div className={styles.slider_wrapper}>
          <SimpleSlider />
        </div>
      </div>
    </section>
  );
}

export default WorksSection;

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={img1} className={styles.slider_image} alt="" />
        </div>
        <div>
          <img src={img2} className={styles.slider_image} alt="" />
        </div>
        <div>
          <img src={img3} className={styles.slider_image} alt="" />
        </div>
        <div>
          <img src={img4} className={styles.slider_image} alt="" />
        </div>
      </Slider>
    );
  }
}
