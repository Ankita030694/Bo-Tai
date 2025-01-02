import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import review from '../../assets/Reviews.png';

const bananaAnimation = {
  initial: { x: -100, opacity: 0, rotateY: -30 },
  animate: { x: 0, opacity: 1, rotateY: 0 },
  transition: { type: "spring", stiffness: 70, damping: 20 }
};

const Reviews = () => {
  useEffect(() => {
    // Create script element for Elfsight
    const script = document.createElement('script');
    script.src = 'https://apps.elfsight.com/p/platform.js';
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-brown-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left Image Section */}
          <motion.div 
            initial={bananaAnimation.initial}
            whileInView={bananaAnimation.animate}
            viewport={{ once: true }}
            transition={bananaAnimation.transition}
            className="relative flex justify-center"
          >
            <img 
              src={review} 
              alt="Sushi" 
              className="shadow-xl max-w-full sm:w-80 md:w-full"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-8 md:left-96 md:transform-none p-4 rounded-lg shadow-lg text-white bg-brown-500"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white">90K+</h3>
              <p className="text-sm md:text-base">Happy customers</p>
            </motion.div>
          </motion.div>

          {/* Right Widget Section */}
          <div className="grid overflow-hidden">
            <div 
              className="elfsight-app-e764e504-04d6-4e56-bc1b-bb30ec9e7c1b p-4" 
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
