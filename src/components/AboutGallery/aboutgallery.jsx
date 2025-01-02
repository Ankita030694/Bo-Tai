import React, { useState, useEffect } from 'react';
import gallery1 from '../../assets/about/gallery1.png';
import gallery2 from '../../assets/about/gallery2.png';
import gallery3 from '../../assets/about/gallery3.png';
import gallery4 from '../../assets/about/gallery4.png';
import gallery5 from '../../assets/about/gallery5.png';
import gallery6 from '../../assets/about/gallery6.png';
import gallery7 from '../../assets/about/gallery7.png';
import gallery8 from '../../assets/about/gallery8.png';
import leftbowl from '../../assets/about/lbowl.png';
import rightbowl from '../../assets/about/rbowl.png';

const HeroSection = () => {
  return (
    <div className="bg-brown-400 px-4 py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="absolute left-0 top-0">
          <img
            src={leftbowl}
            alt="Decorative dish"
            className="w-32 sm:w-full h-auto object-contain opacity-90"
          />
        </div>
        <div className="absolute right-0 top-0">
          <img
            src={rightbowl}
            alt="Decorative dish"
            className="w-32 sm:w-full h-auto object-contain opacity-90"
          />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl text-center font-bold text-[#4A3427] mb-6 sm:mb-8">
            ENJOY EXCEPTIONAL TASTE
          </h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg text-[#4A3427] leading-relaxed">
              BO TAI, DELHI - bo tai, a Modern Thai bar & Grill concept is a perfect blend of
              cosmopolitan italian design with the vibrance of thai hues. a smart casual vibe
              clubbed with a serendipitous coziness, bo-tai is designed for the young and socially
              smart champagne set.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GallerySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
    const images = [
      { id: 6, image: gallery3, title: 'Artistic Drinks' },
      { id: 1, image: gallery1, title: 'Signature Cocktails' },
      { id: 2, image: gallery2, title: 'Thai Delicacies' },
      { id: 3, image: gallery3, title: 'Artistic Drinks' },
      { id: 5, image: gallery2, title: 'Thai Delicacies' },
      { id: 7, image: gallery1, title: 'Signature Cocktails' },
      { id: 8, image: gallery2, title: 'Thai Delicacies' },
      { id: 4, image: gallery1, title: 'Signature Cocktails' },
      { id: 9, image: gallery3, title: 'Artistic Drinks' },
    ];
  
    const totalSlides = Math.ceil(images.length / 3);
  
    useEffect(() => {
      let interval;
      if (isAutoPlaying) {
        interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 4000);
      }
      return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);
  
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };
  
    const getCurrentImages = () => {
      const startIndex = currentIndex * 3;
      return images.slice(startIndex, startIndex + 3);
    };
  
    return (
      <div className="bg-brown-300 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
                {getCurrentImages().map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <div className="aspect-w-4 aspect-h-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-80 md:w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              →
            </button>
  
            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-[#F4511E]' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const AboutGallery = () => {
    return (
      <div className='overflow-hidden'>
        <HeroSection />
        <GallerySection />
      </div>
    );
  };

export default AboutGallery;
