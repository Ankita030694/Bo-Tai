import React from 'react';
import { motion } from 'framer-motion';
import story from '../../assets/story2.png'
const OurStory = () => {
  const titleVariants = {
    hidden: { 
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statCardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full py-16 px-8 bg-brown-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left side - Title */}
        <motion.div 
          className="md:w-1/3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          style={{ backgroundImage: `url(${story})` }}
        >
          
        </motion.div>

        {/* Right side - Content */}
        <div className="md:w-2/3 flex flex-col gap-8">
        <h2 className="text-[#F85C2C] text-6xl font-bold">
            OUR STORY
          </h2>
          {/* Description */}
          <motion.p 
            className="text-lg leading-relaxed text-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={contentVariants}
          >
            BO TAI, DELHI – bo tai, a Modern Thai bar & Grill concept is a perfect blend of cosmopolitan italian design with the vibrance of thai hues. a smart casual vibe clubbed with a serendipitous coziness, bo–tai is designed for the young and socially smart champagne set. a smart, spunky verbal 'pun bow-tie' that represents both the style and flavor of oriental cuisine. it is a concept set against international decor, which is contemporary thai and italian. 'Tai', is imperfect insinuation of the food philosophy.
          </motion.p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {/* Outlets stat */}
            <motion.div 
              className="flex-1 min-w-[200px] rounded-2xl p-6 bg-orange-200 border-orange-100 border-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={statCardVariants}
            >
              <div className="text-4xl font-bold mb-2">4+</div>
              <div className="text-xl">Outlets across in India</div>
            </motion.div>

            {/* Awards stat */}
            <motion.div 
              className="flex-1 min-w-[200px] rounded-2xl p-6 bg-orange-200 border-orange-100 border-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={statCardVariants}
            >
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-xl">Awards and certificates</div>
            </motion.div>

            {/* Additional Awards stat */}
            <motion.div 
              className="flex-1 min-w-[200px] rounded-2xl p-6 bg-orange-200 border-orange-100 border-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={statCardVariants}
            >
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-xl">Awards and certificates</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;