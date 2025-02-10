import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import review from '../../assets/Reviews.png';
import review2 from "../../assets/newImages/19.jpg";
import google_reviews from "../../assets/google_review.jpeg";

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
              src={review2} 
              alt="Sushi" 
              className="shadow-xl max-w-full sm:w-80 md:w-full sushi"
            />
          </motion.div>

          {/* Right Widget Section */}
          <div className="grid overflow-hidden h-full">
            <img 
              src={google_reviews} 
              alt="Google Reviews" 
              className="w-full h-full object-contain"
            />
            <img 
              src={google_reviews} 
              alt="Google Reviews" 
              className="w-full h-full object-contain"
            />  
            {/* <div 
              className="elfsight-app-e764e504-04d6-4e56-bc1b-bb30ec9e7c1b p-4" 
              data-elfsight-app-lazy
            ></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
