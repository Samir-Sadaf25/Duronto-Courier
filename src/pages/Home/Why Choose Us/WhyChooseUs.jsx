// src/components/WhyChooseUs.jsx
import React from 'react';
import { motion } from 'framer-motion';

// replace these with your actual illustration imports


const features = [
  {
    title: 'Live Parcel Tracking',
    description:
      "Stay updated in real-time with our tracking feature. Monitor your shipment's entire journey—from pick-up to drop-off—and get instant status updates for peace of mind.",
    image: 'https://i.ibb.co/4RWwx0Kg/Illustration.png',
    alt: 'Live Parcel Tracking Illustration',
  },
  {
    title: '100% Safe Delivery',
    description:
      'Parcels are handled with the utmost care and delivered securely. Our reliable process guarantees damage-free delivery, every time.',
    image: 'https://i.ibb.co/TMNmM93t/Group-4.png',
    alt: 'Safe Delivery Illustration',
  },
  {
    title: '24/7 Call Center Support',
    description:
      'Our support team is available around the clock to answer questions, provide updates, or solve delivery concerns—whenever you need us.',
    image: 'https://i.ibb.co/99CPVVzL/vector-1739888378712-151ebe04ad6c.png',
    alt: 'Call Center Support Illustration',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="w-10/12 mx-auto mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Duronto Courier</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover the advantages that make us the top choice for fast, reliable,
          and transparent parcel delivery across Bangladesh.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow p-6
                         md:divide-x-2 md:divide-dashed md:divide-gray-200"
              
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
            >
              {/* Illustration */}
              <div className="md:w-1/3 flex items-center justify-center">
                <img
                  src={feat.image}
                  alt={feat.alt}
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Text */}
              <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
