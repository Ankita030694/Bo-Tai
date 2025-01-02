import React from 'react';
import location1 from '../../assets/about/location1.png';
import location2 from '../../assets/about/location2.png';
import location3 from '../../assets/about/location3.png';

const locations = [
  {
    city: 'GOA',
    image: location1,
    description: 'Modern Thai bar & Grill'
  },
  {
    city: 'DELHI',
    image: location3,
    description: 'Modern Thai bar & Grill'
  },
  {
    city: 'BANGALORE',
    image:  location2,
    description: 'Modern Thai bar & Grill'
  }
];

const OurLocation = () => {
  return (
    <div className="w-full mx-auto px-4 bg-brown-300">
      {/* Header Text */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <p className="text-lg text-black pt-12">
          BO TAI, DELHI - bo tai, a Modern Thai bar & Grill concept is a perfect blend of
          cosmopolitan italian design with the vibrance of thai hues. a smart casual
          vibe clubbed with a serendipitous coziness, bo-tai is designed for the young
          and socially smart champagne set.
        </p>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8">
        {locations.map((location) => (
          <div 
            key={location.city}
            className="relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute transition-opacity duration-300 group-hover:opacity-20" />
              <img
                src={location.image}
                alt={`${location.city} location`}
                className="pb-20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                {/* <h2 className="text-4xl font-bold mb-2 tracking-wider">BO-TAI</h2> */}
                {/* <p className="text-2xl tracking-wide">{location.city}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurLocation;