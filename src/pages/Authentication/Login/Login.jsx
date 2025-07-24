// src/components/Login.jsx
import React, { use, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts & Providers/AuthContext & Provider/AuthContext";
import { GoogleAuthProvider } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
export default function Login() {
  const { setUser, signIn, signInWithGoogle } = use(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const [errorMsg, setError] = useState("");

  const notify = () => {
    toast.success("Account Login Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  // const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleLogin = (e) => {
    e.preventDefault();
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        notify();
        navigate(from);
      })
      .catch((error) => {
        const errorMessge = error.message;
        setError(errorMessge);
      });
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    setError("");
    signIn(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        notify();
        navigate(from);
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <div className="w-full max-w-md  mx-auto bg-white  ">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#03373D] text-center mb-2">
        Welcome Back
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Login with Duronto Courier
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
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
        </div>

        {/* Password */}
        <div>
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
            {...register("password")}
            className="w-full px-4 py-2 border-b border-gray-300 focus:border-[#CAEB66] focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-[#03373D] hover:underline"
          >
            Forget Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#CAEB66] text-[#03373D] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Login
        </button>

        {/* OR Separator */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-gray-400">Or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Google Login */}
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
          <span className="font-medium text-gray-700">Login with Google</span>
        </button>
      </form>

      {/* Register Link */}
      <p className="mt-6 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-[#03373D] font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
