import React from 'react';
import aboutheader from '../../assets/about/aboutheader.png';
import TableReservation from '../../components/Reservation/reservationComponent';
import OurLocation from '../../components/ourlocation/ourlocation';
import AboutGallery from '../../components/AboutGallery/aboutgallery';
import Footer from '../../components/Footer/footer';
import NavbarTwo from '../../components/Navbar/navbar2';
import LogoSlider from '../../components/LogoSlider/logoslider';
import Navbar from '../../components/Navbar/navbar';

const About = () => {
  return (
    <div className="relative">
      <NavbarTwo />  
      <div className="w-full bg-brown-200 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <div className="relative h-full w-full">
                <img
                  src={aboutheader}
                  alt="Thai dish presentation"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              </div>
            </div>
            
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-100 tracking-wider">
                ABOUT US
              </h1>
            </div>
          </div>
        </div>
      </div>

      <OurLocation />
      <AboutGallery />
      <LogoSlider />

      <Footer />
    </div>
  );
};

export default About;