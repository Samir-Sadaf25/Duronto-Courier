import { useState } from "react";
import useActiveRiders from "../../../Hooks/useActiveRiders";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RiderDetailsModal from "../../../Components/Rider Details and Modal/RiderDetailsModal";

export default function ActiveRiders() {
  const { riders, loading } = useActiveRiders();
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const handleDeactivate = async (id) => {
    await axiosSecure.patch(`/riders/${id}`, { status: "inactive" });
    window.location.reload();
  };

  if (loading) return <div>Loading active riders…</div>;

  return (
    <div>
      <RiderDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        rider={selectedRider}
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
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.email}</td>
              <td className="p-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>
              <td>
                <button
                  onClick={() => {
                    setSelectedRider(r);
                    setModalOpen(true);
                  }}
                >
                  View Info
                </button>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDeactivate(r._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
