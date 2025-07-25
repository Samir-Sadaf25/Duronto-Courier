// src/components/AuthLayout.jsx
import React from "react";
import logo from "../assets/logo.png"; // your logo file
import authBanner from "../assets/authImage.png"; // your banner/illustration
import { Link, Outlet } from "react-router";
// import Login from '../pages/Authentication/Login/Login';
import Register from "../pages/Authentication/Register/Register";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left column – logo + form */}
      <div className="w-full md:w-1/2 flex flex-col  px-6 py-12">
        {/* Logo & Brand */}
        <Link to={"/"}>
        <div className="flex items-center mb-12">
          
            <img
              src={logo}
              alt="logo"
              className="w-[30px] -mr-2.5 -mt-2.5 mb-3 rotate-3"
            />
            <p className="text-3xl font-bold">Duronto Courier</p>
          
        </div>
        </Link>

        {/* Nested routes (Login / Register) */}
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Right column – banner image */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#FAFDF0] justify-center items-center p-6">
        <img
          src={authBanner}
          alt="Auth Side Banner"
          className="w-full h-auto max-w-lg object-contain"
        />
      </div>
    </div>
  );
}
