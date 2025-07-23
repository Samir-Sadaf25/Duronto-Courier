// src/components/Register.jsx
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';

export default function Register() {


  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 ">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#03373D] text-center mb-2">
        Create Account
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Sign up for Duronto Courier
      </p>

      <form className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
       
            
            className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
           
            
            className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            
    
            className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm" className="block mb-1 font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            required
        
            className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#CAEB66] text-[#03373D] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Register
        </button>

        {/* OR Separator */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-gray-400">Or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => console.log('Google sign-up')}
        >
         <img src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" alt="" className='w-5' />
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-[#03373D] font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
