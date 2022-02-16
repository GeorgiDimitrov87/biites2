import Reac from 'react';
import { SwiperSlide, SwiperSlideProps } from "swiper/react";

import styles from "./swiper.module.css";

const Slide: React.FC<SwiperSlideProps> = (props) => {
  const { className, ...rest } = props;
  const classes = [styles.slide, className].join(" ");

  return <SwiperSlide className={classes} {...rest} />;
};

Slide.displayName = "SwiperSlide";

export default Slide;
