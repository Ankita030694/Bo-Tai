import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./header.css";

// Import images
// import hero from "../../assets/hero.png";
import header7 from "/banners/BOTAI 16X9.jpg";

const images = [header7];

const Header = () => {
  const [boxesVisible, setBoxesVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBoxesVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const textAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 50, damping: 20 },
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
  };

  return (
    <div className="relative h-screen">
      {/* Carousel */}
      <Slider {...carouselSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-screen object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Initial Cover Boxes */}
      {boxesVisible && (
        <div className="absolute inset-0 flex flex-wrap">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="w-1/3 h-1/3 bg-brown-200 animate-fade-out transform scale-110"
              style={{ animationDelay: `${idx * 0.17}s` }}
            ></div>
          ))}
        </div>
      )}

      {/* Animated Text */}
      {!boxesVisible && (
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto h-full flex flex-col justify-center px-4 text-center items-center">
            <motion.h1
              initial={textAnimation.initial}
              animate={textAnimation.animate}
              transition={{ ...textAnimation.transition, delay: 0 }}
              className="text-5xl md:text-6xl lg:text-8xl font-bold text-brown-200 mb-6 md:mb-8 font-heading tracking-tighter relative"
            >
              <div className="glassy-box">MODERN THAI BAR & GRILL</div>
            </motion.h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
