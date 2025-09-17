// src/hooks/useUnassignedParcels.jsx
import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";

export default function useUnassignedParcels() {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]); // default empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/admin/parcels/unassigned")
      .then((res) => setParcels(res.data ?? [])) // ensure array
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  return { parcels, setParcels, loading };
}
