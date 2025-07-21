// src/components/HeroBanner.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function BecomeMerchant() {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    show:   { opacity: 1, x: 0 },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    show:   { opacity: 1, x: 0 },
  };

  return (
    <motion.section
      className="relative bg-[#03373D] py-20 overflow-hidden lg:w-10/12 lg:mx-auto mb-20 mt-10 rounded-4xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Gradient graphic at top center */}
      <img
        src="https://i.ibb.co/27kcs688/be-a-merchant-bg.png"
        alt="Gradient Overlay"
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
      />

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
        {/* Text & Buttons */}
        <motion.div
          className="w-full md:w-1/2 text-white mt-12 md:mt-0"
          variants={textVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-md">
            We offer the lowest delivery charge with the highest value along with
            100% safety of your product. Duronto Courier delivers your parcels
            in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#CAEB66] text-[#03373D] py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition">
              Become a Merchant
            </button>
            <button className="border border-[#CAEB66] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#CAEB66] hover:text-[#03373D] transition">
              Earn with Duronto Courier
            </button>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-12 md:mb-0"
          variants={imageVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src="https://i.ibb.co/d0GSZHHS/location-merchant.png"
            alt="Hero Illustration"
            className="w-full h-auto max-w-sm"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
