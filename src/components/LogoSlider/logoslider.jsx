import React from "react";
import { motion } from "framer-motion";
import logo1 from "../../assets/logos/1.png";
import logo2 from "../../assets/logos/2.png";
import logo3 from "../../assets/logos/3.png";
import logo4 from "../../assets/logos/4.png";
import logo5 from "../../assets/logos/5.png";
import logo6 from "../../assets/logos/6.png";
import logo7 from "../../assets/logos/7.png";
import logo8 from "../../assets/logos/8.png";
import logo9 from "../../assets/logos/9.png";
import logo10 from "../../assets/logos/10.png";
import logo11 from "../../assets/logos/11.png";
// import logo9 from "../../assets/logos/logo9.png";
import Slider from "react-infinite-logo-slider";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11]; // Add your logo images here

const LogoSlider = () => {

  return (
   <div className="slider-logo bg-brown-400">
     <Slider
    width="250px"
    duration={40}
    pauseOnHover={true}
    blurBorders={false}
    blurBorderColor={'#FFD3AF'}
    
>
    {logos.map((img)=> <Slider.Slide >
        <img src={img }alt="any" className='w-36' />
    </Slider.Slide>)}
</Slider>
   </div>
)
};

export default LogoSlider;
