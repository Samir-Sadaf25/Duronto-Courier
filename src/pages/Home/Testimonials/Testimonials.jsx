// src/components/Testimonials.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";

const reviews = [
  {
    name: "John Doe",
    profession: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0",
    text: "This delivery service is fantastic! My parcels arrive on time and always in perfect condition.",
  },
  {
    name: "Jane Smith",
    profession: "Doctor",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
    text: "I love the real-time tracking. It gives me peace of mind knowing exactly where my package is.",
  },
  {
    name: "Alice Johnson",
    profession: "Teacher",
    image:
      "https://plus.unsplash.com/premium_photo-1669703777437-27602d656c27?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
    text: "Amazing customer service and super fast delivery across Bangladesh. Highly recommended!",
  },
  {
    name: "Michael Brown",
    profession: "Fitness Trainer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
    text: "Their cash-on-delivery option is a game changer. So convenient and safe!",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const len = reviews.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % len);
    }, 3000);
    return () => clearInterval(interval);
  }, [len]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Center Illustration */}
        <img
          src="https://i.ibb.co/twBptsy1/customer-top.png"
          alt="Testimonials"
          className="mx-auto mb-4 w-60 h-24"
        />

        {/* Heading & Subtext */}
        <h2 className="text-3xl font-bold text-[#03373D] mb-2">
          What our customers are sayings
        </h2>
        <p className="text-gray-600 mb-12">
          Hear directly from our users who have experienced fast, reliable, and
          transparent delivery with Duronto Courier.
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden h-[340px]">
        {reviews.map((r, i) => {
          const isActive = i === active;
          const isPrev = i === (active - 1 + len) % len;
          const isNext = i === (active + 1) % len;

          // Show only prev, active, next
          if (!isActive && !isPrev && !isNext) return null;

          // Position cards: prev at 25%, active at 50%, next at 75%
          let posClass = 'left-1/2 -translate-x-1/2';
          if (isPrev) posClass = 'md:left-1/4 md:-translate-x-1/2';
          if (isNext) posClass = 'md:left-3/4 md:-translate-x-1/2';
      
          // Scale & opacity
          const scaleClass = isActive
            ? "scale-100 opacity-100"
            : "scale-90 opacity-40";
          const responsiveClass = !isActive ? "hidden md:block" : "";
          return (
            <motion.div
              key={i}
              className={`absolute top-0 ${posClass} ${scaleClass} ${responsiveClass}
                w-80 md:w-96 p-6 bg-white rounded-xl shadow-lg`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isActive ? 1 : 0.4,
                scale: isActive ? 1 : 0.9,
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote Icon */}
              <div className="flex justify-start text-gray-300 mb-2">
                <FaQuoteRight size={24} />
              </div>

              {/* Review Text */}
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                {r.text}
              </p>

              {/* Divider */}
              <div className="border-t border-dotted border-gray-300 mb-4" />

              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.profession}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
