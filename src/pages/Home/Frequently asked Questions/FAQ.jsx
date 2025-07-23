// src/components/FAQ.jsx
import React, { useState } from "react";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";

const faqs = [
  {
    question: "How can I track my parcel?",
    answer:
      "Once you complete payment, you will receive a unique tracking ID. Enter that ID on our Track page to get real-time status updates at every stage.",
  },
  {
    question: "What are the delivery charges?",
    answer:
      "Our system calculates the charge automatically based on parcel type, weight, and destination district. You’ll see the final cost in the confirmation toast before booking.",
  },
  {
    question: "Can I schedule a pickup time?",
    answer:
      "Yes. During booking, use the “Pickup Instruction” field to specify your preferred date/time window. Our rider will arrive accordingly.",
  },
  {
    question: "How does Cash on Delivery work?",
    answer:
      "Select “Cash on Delivery” as your payment method. Our rider will collect the exact amount from the receiver at delivery, and you’ll see it reflected in your Earnings dashboard.",
  },
  {
    question: "What if I need to return a parcel?",
    answer:
      "We support reverse logistics—just open a return request in your dashboard or contact our support. We’ll collect the parcel and initiate the return to the sender.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#03373D] mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-gray-600 mb-12">
          Find quick answers to common questions about booking, tracking,
          payment, and delivery with Duronto Courier.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((item, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="font-medium text-gray-800">
                    {item.question}
                  </span>
                  <FiChevronDown
                    className={`text-gray-600 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`px-4 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 py-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="mt-12 inline-flex items-center space-x-2 bg-[#CAEB66] text-[#03373D]
                     py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 transition"
        >
          <span>See More FAQ’s</span>
          <FiArrowUpRight size={20} />
        </button>
      </div>
    </section>
  );
}
