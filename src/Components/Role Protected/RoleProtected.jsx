// src/components/RoleProtected.jsx
import { Navigate, Outlet } from "react-router";
import useUserInfo from "../../Hooks/useUserInfo";

export default function RoleProtected({ requiredRole, redirectTo = "/unauthorized" }) {
  const { userInfo, loading } = useUserInfo();

  if (loading) {
    return <div className="p-4 text-center">Loading…</div>;
  }

  if (!userInfo || userInfo.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
