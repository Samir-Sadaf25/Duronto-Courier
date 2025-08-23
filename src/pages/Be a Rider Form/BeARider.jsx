// src/components/BeARider.jsx
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

// All your region/district data in one JSON
import districts from "../Covarage/districts.json";


export default function BeARider() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the region field to dynamically update warehouses
  const selectedRegion = watch("region");

  // Memoize unique region list
  const regionOptions = useMemo(() => {
    return Array.from(new Set(districts.map((d) => d.region)));
  }, []);

  // Memoize covered_area list for the selected region
  const warehouseOptions = useMemo(() => {
    if (!selectedRegion) return [];
    // collect all covered_area arrays for objects matching selectedRegion
    const areas = districts
      .filter((d) => d.region === selectedRegion)
      .flatMap((d) => d.covered_area);
    // dedupe
    return Array.from(new Set(areas));
  }, [selectedRegion]);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // TODO: POST to your backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center">Be a Rider</h1>
      <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
        Enjoy fast, reliable parcel delivery with real-time tracking and zone
        services. From personal packages to business shipments—we deliver on
        time, every time.
      </p>

      {/* Two-column layout */}
      <div className="mt-8 flex flex-col md:flex-row items-start gap-10">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Tell us about yourself
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                placeholder="Full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block mb-1 font-medium">Your Age</label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Must be at least 18" },
                  max: { value: 65, message: "Must be under 65" },
                })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                placeholder="e.g. 25"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Your Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Region Select */}
            <div>
              <label className="block mb-1 font-medium">Your Region</label>
              <select
                {...register("region", { required: "Region is required" })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              >
                <option value="">Select a region</option>
                {regionOptions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.region.message}
                </p>
              )}
            </div>

            {/* Warehouse (covered_area) Select */}
            <div>
              <label className="block mb-1 font-medium">
                Which warehouse would you like to work?
              </label>
              <select
                {...register("warehouse", {
                  required: "Warehouse is required",
                })}
                disabled={!selectedRegion}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring bg-white disabled:opacity-50"
              >
                <option value="">
                  {selectedRegion
                    ? "Select a warehouse"
                    : "Choose region first"}
                </option>
                {warehouseOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.warehouse && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.warehouse.message}
                </p>
              )}
            </div>

            {/* NID No */}
            <div>
              <label className="block mb-1 font-medium">NID No</label>
              <input
                {...register("nid", { required: "NID number is required" })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                placeholder="National ID number"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nid.message}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block mb-1 font-medium">Contact</label>
              <input
                type="tel"
                {...register("contact", {
                  required: "Contact is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                placeholder="e.g. 01712345678"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="w-full md:w-1/2">
          <img
            src="/src/assets/agent-pending.png" // swap in your image path
            alt="Delivery Rider"
            className="w-full h-auto rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
}
