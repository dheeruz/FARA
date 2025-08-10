import React from 'react';

const services = [
  {
    icon: '💍',
    title: 'Wedding Planning',
    desc: 'Luxury weddings with every detail crafted to perfection.',
  },
  {
    icon: '🏢',
    title: 'Corporate Events',
    desc: 'Professional setups tailored for all business occasions.',
  },
  {
    icon: '🎉',
    title: 'Birthday Parties',
    desc: 'Fun-filled and personalized birthday celebrations.',
  },
  {
    icon: '🎭',
    title: 'Theme Parties',
    desc: 'Immersive themes that make your event unforgettable.',
  },
];

function OurServices() {
  return (
    <section className="bg-gradient-to-b from-pink-50 to-purple-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12 drop-shadow-lg">✅ Our Event Services</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tr from-purple-200 to-pink-200"
            >
              <div className="text-5xl text-center mb-4 group-hover:animate-bounce">{service.icon}</div>
              <h3 className="text-xl font-semibold text-center text-purple-800 mb-2 group-hover:text-purple-900">{service.title}</h3>
              <p className="text-center text-gray-600 group-hover:text-gray-800">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurServices;
