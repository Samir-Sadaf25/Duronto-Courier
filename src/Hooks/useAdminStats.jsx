// src/hooks/useAdminStats.jsx
import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
export default function useAdminStats() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({ activeRidersList: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/admin/stats")
      .then((res) => {
        // default fallback if res.data.activeRidersList missing
        setStats({
          activeRidersList: Array.isArray(res.data.activeRidersList)
            ? res.data.activeRidersList
            : [],
        });
      })
      .catch((err) => console.error("useAdminStats error:", err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  return { stats, loading };
}
