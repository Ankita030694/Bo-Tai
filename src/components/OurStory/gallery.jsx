import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gallery1 from '../../assets/gallery1.png';
import gallery2 from '../../assets/gallery2.png';
import gallery3 from '../../assets/gallery3.png';
import gallerybg from '../../assets/bg-story.png';

const BoTaiGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [gallery1, gallery2, gallery3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const overlayVariants = {
    hover: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="w-full min-h-[500px] p-6 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${gallerybg})`,
      }}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <div className="grid gap-4 max-w-6xl w-full md:grid-cols-3 sm:grid-cols-1">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-xl relative"
            variants={imageVariants}
            whileHover="hover"
          >
            <motion.img
              src={images[(currentImage + index) % images.length]}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="absolute inset-0 bg-black/0"
              variants={overlayVariants}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BoTaiGallery;
