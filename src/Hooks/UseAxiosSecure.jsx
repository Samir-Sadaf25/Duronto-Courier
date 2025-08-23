import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../Contexts & Providers/AuthContext & Provider/AuthContext";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const UseAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  axiosSecure.interceptors.request.use((config) => {
    //const token = localStorage.getItem("access-token");

    config.headers.Authorization = `Bearer ${user.accessToken}`;

    return config;
  });

  return axiosSecure;
};

export default UseAxiosSecure;
