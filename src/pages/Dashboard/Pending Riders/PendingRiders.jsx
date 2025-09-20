import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import usePendingRiders from "../../../Hooks/usePendingRiders";
import RiderDetailsModal from "../../../Components/Rider Details and Modal/RiderDetailsModal";

export default function PendingRiders() {
  const { riders, loading } = usePendingRiders();
  const axiosSecure = useAxiosSecure();
const [modalOpen, setModalOpen] = useState(false);
const [selectedRider, setSelectedRider] = useState(null);
  const handleUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/riders/${id}`, { status: newStatus });
      // Optimally you'd update state, but for simplicity:
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Failed to update rider status", err);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading pending riders…</div>;
  }

  if (riders.length === 0) {
    return <div className="p-6 text-center">No pending riders.</div>;
  }

  return (
     <>
      <RiderDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        rider={selectedRider}
        onApprove={handleUpdate}
      />

      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Joined</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((r) => (
            <tr key={r._id} className="border-b">
              <td className="p-2 text-center">{r.name}</td>
              <td className="p-2 text-center">{r.email}</td>
              <td className="p-2 text-center">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 text-center" >
                <button
                  onClick={() => {
                    setSelectedRider(r);
                    setModalOpen(true);
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  View & Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
