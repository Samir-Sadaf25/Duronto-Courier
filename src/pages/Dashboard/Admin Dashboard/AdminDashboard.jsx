import { useNavigate } from "react-router";
import useAdminStats from "../../../Hooks/useAdminStats";

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats();

  // 1) Show a loader (or skeleton) while fetching
  if (loading || !stats) {
    return <div className="p-6 text-center">Loading dashboard…</div>;
  }

  // 2) Now stats is guaranteed non-null
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
      <Card title="Users" value={stats.totalUsers} />
      <Card title="Parcels" value={stats.totalParcels} />
      <Card title="Pending Riders" value={stats.pendingRiders} />
      <Card title="Active Riders" value={stats.activeRiders} />
      <Card title="Revenue" value={`৳${stats.totalRevenue}`} />
    </div>
  );
}

function Card({ title, value, to }) {
  const navigate = useNavigate();
  const onClick = () => to && navigate(to);

  return (
    <div
      onClick={onClick}
      className={`bg-white shadow rounded p-4 text-center ${
        to ? "cursor-pointer hover:bg-gray-50" : ""
      }`}
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-[#03373D]">{value}</p>
    </div>
  );
}
