import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import banner1 from '../../../../public/banner1.png'
import banner2 from '../../../../public/banner2.png'
import banner3 from '../../../../public/banner3.png'
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
      <div>
        <img src={banner1} />
    
      </div>
      <div>
        <img src={banner2} />
        
      </div>
      <div>
        <img src={banner3} />
        
      </div>
    </Carousel>
  );
};

export default Banner;
