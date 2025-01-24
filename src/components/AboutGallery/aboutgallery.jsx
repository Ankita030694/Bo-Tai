import React, { useState, useEffect } from "react";
import gallery1 from "../../assets/about/gallery1.png";
import gallery2 from "../../assets/about/gallery2.png";
import gallery3 from "../../assets/about/gallery3.png";
import gallery4 from "../../assets/about/gallery4.png";
import gallery5 from "../../assets/about/gallery5.png";
import gallery6 from "../../assets/about/gallery6.png";
import gallery7 from "../../assets/about/gallery7.png";
import gallery8 from "../../assets/about/gallery8.png";
import leftbowl from "../../assets/about/lbowl.png";
import rightbowl from "../../assets/about/rbowl.png";
import image1 from "../../assets/newPhotos/1.jpg";
import image2 from "../../assets/newPhotos/2.jpg";
import image3 from "../../assets/newPhotos/3.jpg";
import image4 from "../../assets/newPhotos/4.jpg";
import image5 from "../../assets/newPhotos/5.jpg";
import image6 from "../../assets/newPhotos/6.jpg";
import image7 from "../../assets/newPhotos/7.jpg";
import image8 from "../../assets/newPhotos/8.jpg";
import image9 from "../../assets/newPhotos/9.jpg"
import image11 from "../../assets/newPhotos/10.jpg";
import image10 from "../../assets/newPhotos/11.jpg";
import image12 from "../../assets/newPhotos/12.jpg";
import image13 from "../../assets/newPhotos/13.jpg";
import image14 from "../../assets/newPhotos/14.jpg";
import image15 from "../../assets/newPhotos/15.jpg";
import image16 from "../../assets/newPhotos/16.jpg";
import image17 from "../../assets/newPhotos/17.jpg";
import image18 from "../../assets/newPhotos/18.jpg"
// import image19 from "../../assets/newPhotos/19.jpg";
// import image20 from "../../assets/newPhotos/20.jpg";
import image21 from "../../assets/newPhotos/21.jpg";
import image22 from "../../assets/newPhotos/22.jpg";
import image23 from "../../assets/newPhotos/23.jpg";
// import image24 from "../../assets/newPhotos/24.jpg";
import image25 from "../../assets/newPhotos/25.jpg";
import image26 from "../../assets/newPhotos/26.jpg";
import image27 from "../../assets/newPhotos/27.jpg";
import image28 from "../../assets/newPhotos/28.jpg";
// import image29 from "../../assets/newPhotos/29.jpg";
import image30 from "../../assets/newPhotos/30.jpg";
import image31 from "../../assets/newPhotos/31.jpg";
import image32 from "../../assets/newPhotos/32.jpg";
import image33 from "../../assets/newPhotos/33.jpg";
import image34 from "../../assets/newPhotos/34.jpg";
// import image35 from "../../assets/newPhotos/35.jpg";
import image36 from "../../assets/newPhotos/36.jpg";
import image37 from "../../assets/newPhotos/37.jpg";
import image38 from "../../assets/newPhotos/38.jpg";
import image39 from "../../assets/newPhotos/39.jpg";
import image40 from "../../assets/newPhotos/40.jpg";
import image41 from "../../assets/newPhotos/41.jpg";
import image42 from "../../assets/newPhotos/42.jpg";
import image43 from "../../assets/newPhotos/43.jpg";
import image44 from "../../assets/newPhotos/44.jpg";
import image45 from "../../assets/newPhotos/45.jpg";
import image46 from "../../assets/newPhotos/46.jpg";
import image47 from "../../assets/newPhotos/47.jpg";
import image48 from "../../assets/newPhotos/48.jpg";
import image49 from "../../assets/newPhotos/49.jpg";
import image50 from "../../assets/newPhotos/50.jpg";
import image51 from "../../assets/newPhotos/51.jpg";
import image52 from "../../assets/newPhotos/52.jpg";
import image53 from "../../assets/newPhotos/53.jpg";
import image54 from "../../assets/newPhotos/54.jpg";
import image55 from "../../assets/newPhotos/55.jpg";
import image56 from "../../assets/newPhotos/56.jpg";
import image57 from "../../assets/newPhotos/57.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
            BO-TAI
          </h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg text-[#4A3427] leading-relaxed">
             BO-TAI, DELHI

Part of the renowned Massive Restaurants group, Bo-Tai is a modern Thai bar and grill that offers an exceptional dining experience. Known for its vibrant ambiance and innovative menu, Bo-Tai seamlessly blends Thai flavors with global influences. Whether you're savoring its exquisite cuisine or enjoying its chic setting, Bo-Tai is the perfect destination for those who appreciate culinary excellence and contemporary elegance
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
    { id: 10, image: image1, title: "Artistic Drinks" },
    { id: 11, image: image2, title: "Artistic Drinks" },
    { id: 12, image: image3, title: "Artistic Drinks" },
    { id: 13, image: image4, title: "Artistic Drinks" },
    { id: 14, image: image5, title: "Artistic Drinks" },
    { id: 15, image: image6, title: "Artistic Drinks" },
    { id: 16, image: image7, title: "Artistic Drinks" },
    { id: 17, image: image8, title: "Artistic Drinks" },
    { id: 18, image: image9, title: 'Artistic Drinks' },
    { id: 19, image: image10, title: "Artistic Drinks" },
    { id: 20, image: image11, title: "Artistic Drinks" },
    { id: 21, image: image12, title: "Artistic Drinks" },
    { id: 22, image: image13, title: "Artistic Drinks" },
    { id: 23, image: image14, title: "Artistic Drinks" },
    { id: 24, image: image15, title: "Artistic Drinks" },
    { id: 25, image: image16, title: "Artistic Drinks" },
    { id: 26, image: image17, title: "Artistic Drinks" },
    { id: 27, image: image18, title: 'Artistic Drinks' },
    // { id: 28, image: image19, title: "Artistic Drinks" },
    // { id: 29, image: image20, title: "Artistic Drinks" },
    { id: 30, image: image21, title: "Artistic Drinks" },
    { id: 31, image: image22, title: "Artistic Drinks" },
    { id: 32, image: image23, title: "Artistic Drinks" },
    // { id: 33, image: image24, title: "Artistic Drinks" },
    { id: 34, image: image25, title: "Artistic Drinks" },
    { id: 35, image: image26, title: "Artistic Drinks" },
    { id: 36, image: image27, title: "Artistic Drinks" },
    { id: 37, image: image28, title: "Artistic Drinks" },
    // { id: 38, image: image29, title: "Artistic Drinks" },
    { id: 39, image: image30, title: "Artistic Drinks" },
    { id: 40, image: image31, title: "Artistic Drinks" },
    { id: 41, image: image32, title: "Artistic Drinks" },
    { id: 42, image: image33, title: "Artistic Drinks" },
    { id: 43, image: image34, title: "Artistic Drinks" },
    // { id: 44, image: image35, title: "Artistic Drinks" },
    { id: 45, image: image36, title: "Artistic Drinks" },
    { id: 46, image: image37, title: "Artistic Drinks" },
    { id: 47, image: image38, title: "Artistic Drinks" },
    { id: 48, image: image39, title: "Artistic Drinks" },
    { id: 49, image: image40, title: "Artistic Drinks" },
    { id: 50, image: image41, title: "Artistic Drinks" },
    { id: 51, image: image42, title: "Artistic Drinks" },
    { id: 52, image: image43, title: "Artistic Drinks" },
    { id: 53, image: image44, title: "Artistic Drinks" },
    { id: 54, image: image45, title: "Artistic Drinks" },
    { id: 55, image: image46, title: "Artistic Drinks" },
    { id: 56, image: image47, title: "Artistic Drinks" },
    { id: 57, image: image48, title: "Artistic Drinks" },
    { id: 58, image: image49, title: "Artistic Drinks" },
    { id: 59, image: image51, title: "Artistic Drinks" },
    { id: 60, image: image52, title: "Artistic Drinks" },
    { id: 61, image: image53, title: "Artistic Drinks" },
    { id: 62, image: image54, title: "Artistic Drinks" },
    { id: 63, image: image55, title: "Artistic Drinks" },
    { id: 64, image: image56, title: "Artistic Drinks" },
    { id: 65, image: image57, title: "Artistic Drinks" },
    // { id: 9, image:  image9, title: 'Artistic Drinks' },
  ];

  const totalSlides = Math.ceil(images.length / 3);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 3000);
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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    // <div className="bg-brown-300 py-16 sm:py-20">
    //   <div className="max-w-6xl mx-auto">
    //     <div className="relative">
    //       <div className="overflow-hidden">
    //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
    //           {getCurrentImages().map((item) => (
    //             <div
    //               key={item.id}
    //               className="relative overflow-hidden rounded-lg group cursor-pointer"
    //             >
    //               <div className="w-full h-full">
    //                 <img
    //                   src={item.image}
    //                   alt={item.title}
    //                   loading="eager"
    //                   className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
    //                 />
    //                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //                   <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
    //                     <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       Navigation Arrows
    //       <button
    //         onClick={prevSlide}
    //         className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
    //       >
    //         ←
    //       </button>
    //       <button
    //         onClick={nextSlide}
    //         className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
    //       >
    //         →
    //       </button>

    //       Dots Navigation
    //       <div className="flex justify-center mt-8 gap-2">
    //         {[...Array(totalSlides)].map((_, index) => (
    //           <button
    //             key={index}
    //             onClick={() => setCurrentIndex(index)}
    //             className={`w-2 h-2 rounded-full transition-colors ${
    //               currentIndex === index ? "bg-[#F4511E]" : "bg-gray-300"
    //             }`}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="mb-5">
    <Carousel 
          responsive={responsive}
          infinite={true}>
              <div className="about_carousel">
                <img src={image1} alt="" />
              </div>
              <div className="about_carousel">
                <img src={image2} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image3} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image4} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image5} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image6} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image7} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image8} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image9} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image10} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image11} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image12} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image13} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image14} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image15} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image16} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image17} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image18} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image21} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image22} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image23} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image25} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image26} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image27} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image28} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image30} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image31} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image32} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image33} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image34} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image36} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image37} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image38} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image39} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image40} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image41} alt=""/>
              </div>

              <div className="about_carousel">
                <img src={image42} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image43} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image44} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image45} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image46} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image47} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image48} alt=""/>
              </div>
              <div className="about_carousel">
                <img src={image49} alt=""/>
              </div>
            </Carousel>
    </div>
  );
};


const AboutGallery = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <GallerySection />
    </div>
  );
};

export default AboutGallery;
