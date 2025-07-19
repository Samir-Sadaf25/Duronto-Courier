// src/components/HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaTruck,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Booking Pick & Drop",
    icon: FaTruck,
  },
  {
    title: "Cash On Delivery",
    icon: FaMoneyBillWave,
  },
  {
    title: "Delivery Hub",
    icon: FaWarehouse,
  },
  {
    title: "Booking SME & Corporate",
    icon: FaBuilding,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ title, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white p-6 rounded-xl shadow"
              
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              
              transition={{
                duration: 0.6,
                delay: idx * 0.2,
                ease: "easeOut",
              }}
            >
              {/* Pin Icon */}
              <div className="absolute -top-3 -right-3 p-2 rounded-full bg-[#CAEB66] text-black">
                <FaMapMarkerAlt size={16} />
              </div>

              {/* Main Service Icon */}
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-[#CAEB66] text-black">
                <Icon size={20} />
              </div>

              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From personal packages to business shipments — we deliver on
                time, every time.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
