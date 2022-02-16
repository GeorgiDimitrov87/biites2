import Reac from 'react';
import { SwiperSlide, SwiperSlideProps } from "swiper/react";

import "./swiper.css";

const Slide: React.FC<SwiperSlideProps> = (props) => { 
  return <SwiperSlide  {...props} />;
};

Slide.displayName = "SwiperSlide";

export default Slide;
