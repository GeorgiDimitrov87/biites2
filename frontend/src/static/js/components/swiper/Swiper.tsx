import React, { useRef } from "react";
import { Swiper as DefaultSwiper, SwiperProps } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./Swiper.module.scss";

const Swiper: React.FC<SwiperProps> = (props) => {
  const { children, className, ...rest } = props;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const classes = [styles.swiper, className].join(" ");

  return (
    <DefaultSwiper
      className={classes}
      centeredSlides
      slidesPerView='auto'
      loop
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }}
      spaceBetween={10}
      {...rest}
    >
      {children}
      <div className={styles.nav_container}>
        <div ref={prevRef} className={styles.nav_btn} />
        <div ref={nextRef} className={styles.nav_btn} />
      </div>
    </DefaultSwiper>
  );
};

export default Swiper;
