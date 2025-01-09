import React from 'react';
import location1 from '../../assets/about/location1.png';
import location2 from '../../assets/about/location2.png';
import location3 from '../../assets/newImages/23.jpg';

const locations = [
  {
    city: 'GOA',
    image: location1,
    description: 'Modern Thai bar & Grill',
    comingSoon: true,
  },
  {
    city: 'DELHI',
    image: location3,
    description: 'Modern Thai bar & Grill',
    comingSoon: false,
  },
  {
    city: 'BANGALORE',
    image: location2,
    description: 'Modern Thai bar & Grill',
    comingSoon: true,
  },
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
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 mb-10 mt-10">
        {locations.map((location, index) => (
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
              }`} // Ensure others adapt to the tallest card (location 2)
              style={{ display: 'flex', height: '100%' }}
            >
              <img
                src={location.image}
                alt={`${location.city} location`}
                className={`w-full object-cover ${
                  index === 2 ? 'h-auto' : 'h-full'
                } rounded-lg`} // Location 2 retains its original size
              />

              {/* Coming Soon Overlay */}
              {location.comingSoon && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">COMING SOON</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurLocation;
