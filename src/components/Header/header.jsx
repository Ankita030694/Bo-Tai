import React, { useState, useEffect } from 'react';
import headerbg from '../../assets/hero.png';
import headerfg from '../../assets/header-fg.png';
import { motion } from 'framer-motion';

const AnimatedHeader = () => {
  const [boxesVisible, setBoxesVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBoxesVisible(false);
    }, 2000); // Adjust the duration for the box animation
    return () => clearTimeout(timer);
  }, []);

  const textAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'string', stiffness: 50, damping: 20 },
  };

  return (
    <div
      className="relative h-screen bg-brown-400"
      style={{
        backgroundImage: `url(${headerbg})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
      }}
    >
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

      {/* Animated Text and Button */}
      {!boxesVisible && (
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto h-full flex flex-col justify-center px-8 text-center items-center">
            <motion.h1
              initial={textAnimation.initial}
              animate={textAnimation.animate}
              transition={{ ...textAnimation.transition, delay: 0 }}
              // className="text-8xl font-bold text-brown-200 mb-8 font-heading tracking-tighter"
              className="text-5xl md:text-6xl lg:text-8xl font-bold text-brown-200 mb-6 md:mb-8 font-heading tracking-tighter"

              style={{
              
              }}
            >
              MODERN THAI BAR & GRILL
            </motion.h1>

            {/* Button (currently commented out) */}
            {/* <motion.button
              initial={textAnimation.initial}
              animate={textAnimation.animate}
              transition={{ ...textAnimation.transition, delay: 0.2 }}
              className="w-fit px-8 py-2 bg-orange-100 text-white rounded-lg hover:bg-brown-100 hover:text-orange-100 font-semibold transition-colors"
            >
              Book a table
            </motion.button> */}
          </div>
        </div>
      )}
      {/* <div className="flex w-screen h-screen justify-center items-center ">
        <img src={headerfg} alt="" className= ' md:h-screen h-auto '/>
      </div> */}
    </div>
  );
};

export default AnimatedHeader;
