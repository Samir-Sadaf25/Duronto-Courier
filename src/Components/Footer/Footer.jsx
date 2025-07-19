// src/components/Footer.jsx
import React from 'react';
import {
  FaLinkedin,
  FaXing,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';
import logo from '../../../public/logo.png'
export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 text-center md:text-left">
        {/* Logo & Tagline */}
        <div className="mb-8 md:flex md:items-start md:justify-between">
          <div className="md:w-1/3">
            <div className='flex'>
               <img
                      src={logo}
                      alt="logo"
                      className="w-[30px] -mr-2.5 -mt-2.5 mb-3 rotate-3"
                    />
              <h1 className="text-3xl font-bold">Duronto Courier</h1>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Empowering fast, reliable parcel delivery
              with real-time tracking and zero hassle.
              From personal packages to business shipments —
              we deliver on time, every time.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 md:mt-0 md:w-1/3">
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              {['Services', 'Coverage', 'About Us', 'Pricing', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-gray-400 text-sm font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-gray-400" />
            </a>
            <a href="https://www.xing.com" target="_blank" rel="noopener noreferrer">
              <FaXing className="text-xl hover:text-gray-400" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl hover:text-gray-400" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-xl hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
