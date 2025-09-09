// src/hooks/useAxiosSecure.jsx
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts & Providers/AuthContext & Provider/AuthContext";


const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

export default function useAxiosSecure() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const id = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user?.getIdToken) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    return () => axiosSecure.interceptors.request.eject(id);
  }, [user]);

  return axiosSecure;
}
