import React from "react";
import { motion } from "framer-motion";
import logo1 from "../../assets/logos/logo1.png";
import logo2 from "../../assets/logos/logo2.png";
import logo3 from "../../assets/logos/logo3.png";
import logo4 from "../../assets/logos/logo4.png";
import logo5 from "../../assets/logos/logo5.png";
import logo6 from "../../assets/logos/logo6.png";
import logo7 from "../../assets/logos/logo7.png";
import logo8 from "../../assets/logos/logo8.png";
// import logo9 from "../../assets/logos/logo9.png";
import Slider from "react-infinite-logo-slider";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8]; // Add your logo images here

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
