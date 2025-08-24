// src/components/BeARider.jsx
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2"; 
import districts from "../Covarage/districts.json";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

export default function BeARider() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  // Watch region to update warehouses
  const selectedRegion = watch("region");

  // Unique region list
  const regionOptions = useMemo(
    () => Array.from(new Set(districts.map((d) => d.region))),
    []
  );

  // Covered areas for selected region
  const warehouseOptions = useMemo(() => {
    if (!selectedRegion) return [];
    const areas = districts
      .filter((d) => d.region === selectedRegion)
      .flatMap((d) => d.covered_area);
    return Array.from(new Set(areas));
  }, [selectedRegion]);

  // New onSubmit: post, alert, navigate
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/riders", data);

      // assumes your backend returns { acknowledged: true, insertedId: "..." }
      if (res.data.insertedId) {
        await Swal.fire({
          title: "Aplication Submitted Seccessfully!",
          text: "Now waiting for your approval 🚴",
          icon: "success",
          confirmButtonText: "Go Home",
        });

        reset();      // clear form (optional)
        navigate("/"); // redirect to home
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Be a Rider</h1>
      <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
        Enjoy fast, reliable parcel delivery with real-time tracking and zone
        services.
      </p>

      <div className="mt-8 flex flex-col md:flex-row items-start gap-10">
        {/* Form */}
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

            {/* Region */}
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

            {/* Warehouse */}
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

            {/* NID */}
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

            {/* Submit */}
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

        {/* Illustration */}
        <div className="w-full md:w-1/2">
          <img
            src="/src/assets/agent-pending.png"
            alt="Delivery Rider"
            className="w-full h-auto rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
}
