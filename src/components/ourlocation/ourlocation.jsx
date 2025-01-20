import React from 'react';
import location1 from '../../assets/about/location1.png';
import location2 from '../../assets/about/location2.png';
import location3 from '../../assets/about/location3.png';

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
          Regarded as ‘the Prince of Indian cuisine’, Zorawar Kalra, after the successful exit from his maiden venture credited with introducing one of the most awarded regional cuisine restaurant concepts in India, launched Massive Restaurants Pvt. Ltd. in December 2012. Massive Restaurants, spearheaded by Mr. Kalra and mentored by his illustrious father & Czar of Indian Cuisine – Jiggs Kalra, was established with an aim to develop India’s premier brands of restaurants that specialize in targeting all segments of the market, while showcasing the evolution of Indian cuisine and putting Indian food on the global palate permanently. The Company currently operates under critically acclaimed, multi award winning brand verticals of premium Fine-Dining Restaurants with the signature Masala Library by Jiggs Kalra, the Smart-Casual Dining Restaurants with the brand Made in Punjab, the modern Indian bistro concept Farzi Café and modern pan-Asian bistro concept Pa Pa Ya, cuisine agnostic modern ‘freestyle’ bar & kitchen – KODE, high energy dining concept – MasalaBar, offering a cutting edge, post-modern & stylish bar, for an immersive dining experience; and unlimited grill and brewery concept – BBQ’D. Massive Restaurants raises the bar a not­ch higher with the launch of its brand new Modern Thai Bar & Grill concept BO-TAI. With each new concept and new outlet we move one step closer to our vision and continue to revolutionize Indian food and night life.
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
