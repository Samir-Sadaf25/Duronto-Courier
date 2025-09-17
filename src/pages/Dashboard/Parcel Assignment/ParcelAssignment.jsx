import useUnassignedParcels from "../../../Hooks/useUnassignedParcels";
import useAdminStats from "../../../Hooks/useAdminStats";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

export default function ParcelAssignment() {
  const [assigning, setAssigning] = useState({});

  // always get arrays or fallback
  const {
    parcels = [],
    setParcels,
    loading: parcelsLoading,
  } = useUnassignedParcels() || {};

  const { stats = { activeRidersList: [] }, loading: statsLoading } =
    useAdminStats() || {};

  const axiosSecure = useAxiosSecure();

  // 1) Wait for both to load
  if (parcelsLoading || statsLoading) {
    return <div>Loading parcels & riders…</div>;
  }

  // 2) No riders?
  const riders = stats.activeRidersList || [];
  if (!riders.length) {
    return <div>No active riders found.</div>;
  }

  // 3) No parcels?
  if (!parcels.length) {
    return <div>No unassigned parcels.</div>;
  }

  // 4) Assign handler
  const handleAssign = async (parcelId, riderId) => {
    setAssigning((prev) => ({ ...prev, [parcelId]: true }));
    try {
      await axiosSecure.patch(`/parcels/${parcelId}/assign`, { riderId });
      setParcels((prev) => prev.filter((p) => p._id !== parcelId));
    } catch (err) {
      console.error("Assign failed", err);
    } finally {
      setAssigning((prev) => ({ ...prev, [parcelId]: false }));
    }
  };

  // 5) Render table
  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th>Parcel ID</th>
          <th>Sender</th>
          <th>Recipient</th>
          <th>Assign To</th>
        </tr>
      </thead>
      <tbody>
        {parcels.map((parcel) => (
          <tr key={parcel._id}>
            <td>{parcel._id}</td>
            <td>{parcel.sender.name}</td>
            <td>{parcel.receiver.name}</td>
            <td>
              <select
                defaultValue=""
                onChange={(e) => handleAssign(parcel._id, e.target.value)}
                disabled={assigning[parcel._id]}
              >
                <option value="" disabled>
                  Select Rider
                </option>
                {riders.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
