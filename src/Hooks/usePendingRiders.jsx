// src/hooks/usePendingRiders.jsx
import { useState, useEffect } from "react";
import useAxiosSecure from "./UseAxiosSecure";


export default function usePendingRiders() {
  const axiosSecure = useAxiosSecure();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/riders?status=pending")
      .then(res => setRiders(res.data))
      .catch(err => console.error("Failed to load pending riders", err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  return { riders, loading };
}
