import React from "react";
import { motion } from "framer-motion";
import bowl from "../../assets/bowl.png";
import { Link } from "react-router-dom";

const TableReservation = () => {
  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scaleInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative w-full bg-brown-200">
      {/* First Section */}
      <motion.section
        className="relative flex items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute bottom-0">
          <motion.img
            src={bowl}
            alt="Elegant dining"
            className="w-full"
            variants={scaleInVariants}
          />
        </div>

        <div className="relative h-[30vh] md:h-[50vh] z-10 ">
          <motion.h1
            className="text-2xl md:text-3xl lg:text-5xl mt-4 font-bold tracking-tight text-orange-100"
            variants={fadeInUpVariants}
          >
            WANT TO BOOK A TABLE?
          </motion.h1>

          <motion.div
            variants={fadeInUpVariants}
            className="absolute  bottom-16  md:bottom-32  flex justify-center"
            style={{
              width: "100%",
            }}
          >
            <motion.button
              className="px-10 py-2 bg-orange-100 text-white text-lg sx:text-xl font-semibold rounded-full 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-100"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/reservation" className="text-white">
                Book a table
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TableReservation;
