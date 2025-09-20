import Modal from "./Modal";


export default function RiderDetailsModal({
  open,
  onClose,
  rider,
  onApprove
}) {
  if (!rider) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Rider Details</h2>
      <div className="space-y-2 mb-6">
        <div><strong>Name:</strong> {rider.name}</div>
        <div><strong>Email:</strong> {rider.email}</div>
        <div><strong>Phone:</strong> {rider.contact}</div>
        <div><strong>Region:</strong> {rider.region}</div>
        <div><strong>Warehouse:</strong> {rider.warehouse}</div>
      </div>
      {onApprove && (
        <button
          onClick={() => onApprove(rider._id)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
        >
          Approve Rider
        </button>
      )}
      <button
        onClick={onClose}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
      >
        Close
      </button>
    </Modal>
  );
}
