// src/hooks/useAssignedParcels.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts & Providers/AuthContext & Provider/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

export default function useAssignedParcels() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    axiosSecure
      .get(`/parcels/assigned?user_email=${encodeURIComponent(user.email)}`)
      .then(res => setParcels(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.email, axiosSecure]);

  return { parcels, setParcels, loading };
}
