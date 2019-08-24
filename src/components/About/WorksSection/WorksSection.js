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
import "./slider.scss";
import { FormattedMessage } from "react-intl";

function WorksSection() {
  return (
    <section className={styles.works}>
      <HeaderStub />
      <div className={styles.works_content}>
        <div className={styles.works_header}>
          <FormattedMessage id="works.header" />
        </div>
        <div className={`${styles.slider_works_wrapper} slider_works_wrapper`}>
          <SimpleSlider />
        </div>
      </div>
    </section>
  );
}

export default WorksSection;

class SimpleSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const worksList = [
      {
        img: img1,
        header: "Название работы",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sollicitudin urna, non molestie metus consectetur quis. Morbi feugiat lectus vel leo interdum, in commodo sapien vulputate. Integer orci turpis, porttitor id massa ut, luctus volutpat nisl. Mauris nulla est, interdum at placerat id, imperdiet in enim. Vestibulum rhoncus tincidunt semper. Aliquam efficitur diam sit amet placerat tincidunt. Donec sem magna, venenatis vitae nibh vitae, imperdiet gravida nulla. Nullam est ipsum, volutpat sed egestas non, blandit et turpis. Nulla viverra lectus at felis fermentum luctus. Proin porta ante sit amet justo fermentum faucibus. Aliquam bibendum consectetur ligula, quis consectetur est tincidunt non.`,
        href: "/"
      },
      {
        img: img2,
        header: "Название работы",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sollicitudin urna, non molestie metus consectetur quis. Morbi feugiat lectus vel leo interdum, in commodo sapien vulputate. Integer orci turpis, porttitor id massa ut, luctus volutpat nisl. Mauris nulla est, interdum at placerat id, imperdiet in enim. Vestibulum rhoncus tincidunt semper. Aliquam efficitur diam sit amet placerat tincidunt. Donec sem magna, venenatis vitae nibh vitae, imperdiet gravida nulla. Nullam est ipsum, volutpat sed egestas non, blandit et turpis. Nulla viverra lectus at felis fermentum luctus. Proin porta ante sit amet justo fermentum faucibus. Aliquam bibendum consectetur ligula, quis consectetur est tincidunt non.`,
        href: "/"
      },
      {
        img: img3,
        header: "Название работы",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sollicitudin urna, non molestie metus consectetur quis. Morbi feugiat lectus vel leo interdum, in commodo sapien vulputate. Integer orci turpis, porttitor id massa ut, luctus volutpat nisl. Mauris nulla est, interdum at placerat id, imperdiet in enim. Vestibulum rhoncus tincidunt semper. Aliquam efficitur diam sit amet placerat tincidunt. Donec sem magna, venenatis vitae nibh vitae, imperdiet gravida nulla. Nullam est ipsum, volutpat sed egestas non, blandit et turpis. Nulla viverra lectus at felis fermentum luctus. Proin porta ante sit amet justo fermentum faucibus. Aliquam bibendum consectetur ligula, quis consectetur est tincidunt non.`,
        href: "/"
      },
      {
        img: img4,
        header: "Название работы",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sollicitudin urna, non molestie metus consectetur quis. Morbi feugiat lectus vel leo interdum, in commodo sapien vulputate. Integer orci turpis, porttitor id massa ut, luctus volutpat nisl. Mauris nulla est, interdum at placerat id, imperdiet in enim. Vestibulum rhoncus tincidunt semper. Aliquam efficitur diam sit amet placerat tincidunt. Donec sem magna, venenatis vitae nibh vitae, imperdiet gravida nulla. Nullam est ipsum, volutpat sed egestas non, blandit et turpis. Nulla viverra lectus at felis fermentum luctus. Proin porta ante sit amet justo fermentum faucibus. Aliquam bibendum consectetur ligula, quis consectetur est tincidunt non.`,
        href: "/"
      }
    ];

    return (
      <Slider {...settings}>
        {worksList.map((slide, index) => (
          <a className={styles.slider_link} href={slide.href} key={index}>
            <img src={slide.img} className={styles.slider_image} alt="" />
            <div className={styles.slider_description}>
              <div className={styles.slider_description_header}>
                {slide.header}
              </div>
              <div className={styles.slider_description_text}>{slide.text}</div>
            </div>
          </a>
        ))}
      </Slider>
    );
  }
}
