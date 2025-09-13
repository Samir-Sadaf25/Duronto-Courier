// src/hooks/useAdminStats.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "./UseAxiosSecure";


export default function useAdminStats() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load admin stats", err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  return { stats, loading };
}
