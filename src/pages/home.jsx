import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/navbar";
import Header from "../components/Header/header";
import OurStory from "../components/OurStory/ourstory";
import Reviews from "../components/Reviews/reviews";
import Footer from "../components/Footer/footer";
import { AnimatePresence, motion } from "framer-motion";
import ReservationBanner from "../components/Reservation/tablereservation";
import BoTaiGallery from "../components/OurStory/gallery";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loader.json";
import NavbarTwo from "../components/Navbar/navbar2";
const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-loading-screen bg-cover bg-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-32 h-32">
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    </motion.div>
  );
};

// Updated Home Component
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or replace with actual data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NavbarTwo />
          <Header /> 
          <OurStory />
          <BoTaiGallery />
          <ReservationBanner />
          <Reviews />
          <Footer />
          {/* Sticky Buttons */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-1 flex justify-around bg-brown shadow-lg border-2 border-[#a47148] rounded-lg">
            <a href="tel:+919870587770">
              <button
                className="bg-[#331c13] text-[#e0b892] p-3 rounded-full w-32"
              >
                Call Us
              </button>
            </a>
            <div className="h-12 w-px bg-[#a47148]"></div>{" "}
            {/* Vertical Line Divider */}
            <a href="/reservation">
              <button
                className="bg-[#331c13] text-[#e0b892] p-3 rounded-full w-32"
                
              >
                Reservation
              </button>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home;
