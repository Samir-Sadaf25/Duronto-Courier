import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts & Providers/AuthContext & Provider/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

export default function useUserInfo() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    axiosSecure
      .get(`/users?email=${encodeURIComponent(user.email)}`)
      .then((res) => setUserInfo(res.data))
      .catch((err) => {
        console.error("Failed to load userInfo", err);
      })
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  return { userInfo, loading };
}
