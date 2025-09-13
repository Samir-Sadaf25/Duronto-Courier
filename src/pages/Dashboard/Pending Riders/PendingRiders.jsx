import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import usePendingRiders from "../../../Hooks/usePendingRiders";

export default function PendingRiders() {
  const { riders, loading } = usePendingRiders();
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/riders/${id}`, { status: newStatus });
      // Optimally you'd update state, but for simplicity:
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
    <table className="min-w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Applied At</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {riders.map((r) => (
          <tr key={r._id} className="border-b">
            <td className="p-2">{r.name}</td>
            <td className="p-2">{r.email}</td>
            <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => handleUpdate(r._id, "active")}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdate(r._id, "rejected")}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
