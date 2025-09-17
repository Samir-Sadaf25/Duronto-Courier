import useAssignedParcels from "../../../Hooks/useAssignedParcels";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


export default function AssignedParcels() {
  const { parcels, setParcels, loading } = useAssignedParcels();
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (id, status) => {
    await axiosSecure.patch(`/parcels/${id}/status`, { status });
    setParcels(prev =>
      prev.map(p => (p._id === id ? { ...p, deliveryStatus: status } : p))
    );
  };

  if (loading) return <div>Loading your assigned parcels…</div>;
  if (parcels.length === 0) return <div>No unassigned parcels.</div>;


  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Recipient</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {parcels.map(p => (
          <tr key={p._id} className="border-b">
            <td className="p-2">{p._id}</td>
            <td className="p-2">{p.receiver.name}</td>
            <td className="p-2">{p.deliveryStatus}</td>
            <td className="p-2 space-x-2">
              {p.deliveryStatus === "pending" && (
                <button
                  onClick={() => updateStatus(p._id, "picked_up")}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Picked Up
                </button>
              )}
              {p.deliveryStatus === "picked_up" && (
                <button
                  onClick={() => updateStatus(p._id, "delivered")}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Delivered
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}