import React from "react";
import location1 from "../../assets/about/location1.png";
import location2 from "../../assets/about/location2.png";
import location3 from "../../assets/about/location3.png";
import about1 from "../../assets/about/1.jpeg";
import about2 from "../../assets/about/2.jpeg";
import about3 from "../../assets/about/3.jpeg";
import about4 from "../../assets/about/4.jpeg";
import about5 from "../../assets/about/5.jpeg";
import about6 from "../../assets/about/6.jpeg";
import about7 from "../../assets/about/7.jpeg";
import about8 from "../../assets/about/8.jpeg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const locations = [
  {
    city: "GOA",
    image: location1,
    description: "Modern Thai bar & Grill",
    comingSoon: true,
  },
  {
    city: "DELHI",
    image: location3,
    description: "Modern Thai bar & Grill",
    comingSoon: false,
  },
  {
    city: "BANGALORE",
    image: location2,
    description: "Modern Thai bar & Grill",
    comingSoon: true,
  },
];
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
const OurLocation = () => {
  return (
    <div className="w-full mx-auto px-4 bg-brown-300 m-10 align-items-center">
      {/* Header Text */}
      <div className="text-center  max-w-6xl mx-auto">
        <p className="text-lg text-black pt-12">
          Regarded as ‘the Prince of Indian cuisine’, Zorawar Kalra, after the
          successful exit from his maiden venture credited with introducing one
          of the most awarded regional cuisine restaurant concepts in India,
          launched Massive Restaurants Pvt. Ltd. in December 2012. Massive
          Restaurants, spearheaded by Mr. Kalra and mentored by his illustrious
          father & Czar of Indian Cuisine – Jiggs Kalra, was established with an
          aim to develop India’s premier brands of restaurants that specialize
          in targeting all segments of the market, while showcasing the
          evolution of Indian cuisine and putting Indian food on the global
          palate permanently. The Company currently operates under critically
          acclaimed, multi award winning brand verticals of premium Fine-Dining
          Restaurants with the signature Masala Library by Jiggs Kalra, the
          Smart-Casual Dining Restaurants with the brand Made in Punjab, the
          modern Indian bistro concept Farzi Café and modern pan-Asian bistro
          concept Pa Pa Ya, cuisine agnostic modern ‘freestyle’ bar & kitchen –
          KODE, high energy dining concept – MasalaBar, offering a cutting edge,
          post-modern & stylish bar, for an immersive dining experience; and
          unlimited grill and brewery concept – BBQ’D. Massive Restaurants
          raises the bar a not­ch higher with the launch of its brand new Modern
          Thai Bar & Grill concept BO-TAI. With each new concept and new outlet
          we move one step closer to our vision and continue to revolutionize
          Indian food and night life.
        </p>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 mb-10 mt-10">
        {/* {locations.map((location, index) => (
          <div
            key={index}
            className="relative rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 w-full max-w-sm"
            style={{
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              className={`relative w-full ${
                index === 2 ? '' : 'h-full'
              }`} 
              style={{ display: 'flex', height: '100%' }}
            >
              <img
                src={location.image}
                alt={`${location.city} location`}
                className={`w-full object-cover ${
                  index === 2 ? 'h-auto' : 'h-full'
                } rounded-lg`} 
              />

              {location.comingSoon && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">COMING SOON</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))} */}
     
        
      </div>
      <Carousel 
      responsive={responsive}
      infinite={true}>
          <div className="about_carousel">
            <img src={about1} alt="" />
          </div>
          <div className="about_carousel">
            <img src={about2} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about3} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about4} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about5} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about6} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about7} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about8} alt=""/>
          </div>
        </Carousel>
    </div>
  );
};

export default OurLocation;
