// src/components/OurServices.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaShippingFast,
  FaGlobeAmericas,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from 'react-icons/fa';

const services = [
  {
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
    icon: FaShippingFast,
  },
  {
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
    icon: FaGlobeAmericas,
  },
  {
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    icon: FaBoxes,
  },
  {
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    icon: FaMoneyBillWave,
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
    icon: FaBuilding,
  },
  {
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    icon: FaUndo,
  },
];

export default function OurServices() {
  return (
    <section className="bg-[#03373D] py-16 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ title, description, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white p-6 rounded-xl shadow-md hover:bg-[#CAEB66] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <div className="flex justify-center mb-4 text-[#03373D]">
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#03373D]">
                {title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
