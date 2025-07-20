// src/components/CompanyMarquee.jsx
import React from 'react';
import { motion } from 'framer-motion';

// import your logo images from assets


const logos = [
  { src: 'https://i.ibb.co/GvHBWDk2/casio.png', alt: 'CASIO' },
  { src: 'https://i.ibb.co/NhkSKbg/amazon.png', alt: 'Amazon' },
  { src: 'https://i.ibb.co/Z1zfWFhj/moonstar.png', alt: 'Moonstar' },
  { src: 'https://i.ibb.co/TD0HsMnp/start.png', alt: 'STAR+' },
  { src: 'https://i.ibb.co/NdtjF2Bg/start-people-1.png', alt: 'Start People' },
  { src: 'https://i.ibb.co/NnZW8S83/randstad.png', alt: 'Randstad' },
];

export default function CompanyMarquee() {
  // duplicate the array so the animation can loop seamlessly
  const loopedLogos = [...logos, ...logos];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">
          We’ve helped thousands of sales teams
        </h2>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center space-x-12"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'linear',
            }}
          >
            {loopedLogos.map((logo, idx) => (
              <div key={idx} className="flex-shrink-0">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
