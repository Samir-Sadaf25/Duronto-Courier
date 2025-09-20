import useUnassignedParcels from "../../../Hooks/useUnassignedParcels";
import useAdminStats from "../../../Hooks/useAdminStats";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

export default function ParcelAssignment() {
  const [assigning, setAssigning] = useState({});

  const {
    parcels = [],
    setParcels,
    loading: parcelsLoading,
  } = useUnassignedParcels() || {};

  const { stats = { activeRidersList: [] }, loading: statsLoading } =
    useAdminStats() || {};

  const axiosSecure = useAxiosSecure();

  // 1) Loading guard
  if (parcelsLoading || statsLoading) {
    return <div className="p-6 text-center">Loading parcels & riders…</div>;
  }

  // 2) No parcels?
  if (!parcels.length) {
    return <div className="p-6 text-center">No unassigned parcels.</div>;
  }

  // 3) Render table
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Parcel ID</th>
            <th className="p-2">Sender</th>
            <th className="p-2">Recipient</th>
            <th className="p-2">Receiver Region</th>
            <th className="p-2">Receiver Center</th>
            <th className="p-2">Assign To</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel) => {
            // filter riders by same region
            const eligibleRiders = stats.activeRidersList.filter(
              (r) => r.region === parcel.receiver.region
            );

            const handleAssign = async (riderId) => {
              setAssigning((prev) => ({ ...prev, [parcel._id]: true }));
              try {
                await axiosSecure.patch(`/parcels/${parcel._id}/assign`, {
                  riderId,
                });
                setParcels((prev) => prev.filter((p) => p._id !== parcel._id));
              } catch (err) {
                console.error("Assign failed", err);
              } finally {
                setAssigning((prev) => ({
                  ...prev,
                  [parcel._id]: false,
                }));
              }
            };

            return (
              <tr key={parcel._id} className="border-b">
                <td className="p-2">{parcel._id}</td>
                <td className="p-2">{parcel.sender.name}</td>
                <td className="p-2">{parcel.receiver.name}</td>
                <td className="p-2">{parcel.receiver.region}</td>
                <td className="p-2">{parcel.receiver.center}</td>
                <td className="p-2">
                  <select
                    defaultValue=""
                    onChange={(e) => handleAssign(e.target.value)}
                    disabled={assigning[parcel._id]}
                    className="border p-1 rounded w-full"
                  >
                    <option value="" disabled>
                      {eligibleRiders.length
                        ? "Select Rider"
                        : "No riders in this region"}
                    </option>
                    {eligibleRiders.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.name} ({r.region})
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
