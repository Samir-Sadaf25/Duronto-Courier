// src/components/Register.jsx
import React, { use, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

import axios from "axios";
import { AuthContext } from "../../../Contexts & Providers/AuthContext & Provider/AuthContext";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

export default function Register() {
  const { createUser, updateUserProfile, setUser, signInWithGoogle,  } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { register, handleSubmit } = useForm();
  const axiosSecure = UseAxiosSecure();
  const uploadImage = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbbApiKey}`,
      formData
    );
    setProfilePic(res.data.data.display_url);
  };

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;

    createUser(email, password).then((result) => {
      const user = result.user;
       const userInfo = {
            email,
            name,
            role: 'user',
            creationTime: result.user?.metadata?.creationTime,
            lastSignInTime: result.user?.metadata?.lastSignInTime
        }
       axiosSecure.post('/users',userInfo)
        .then((res) => {
        
        }).catch(err =>{
           
        })
      setUser(user);
      updateUserProfile({
        displayName: name,
        photoURL:
          profilePic ||
          "https://img.icons8.com/?size=100&id=jF8g9G3v7KE6&format=png&color=000000",
      });
    
      navigate("/");
    });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessge = error.message;
        setError(errorMessge);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 ">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#03373D] text-center mb-2">
        Create Account
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Sign up for Duronto Courier
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}

        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          {...register("name")}
          className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
          placeholder="Your name"
        />
        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
          Your Photo Url
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          {...register("photo")}
          onChange={uploadImage}
          className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
        />

        {/* Email */}

        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          {...register("email")}
          className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
          placeholder="you@example.com"
        />

        {/* Password */}

        <label
          htmlFor="password"
          className="block mb-1 font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          {...register("password", { minLength: 6 })}
          className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
          placeholder="••••••••"
        />

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
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
            alt=""
            className="w-5"
          />
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#03373D] font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
