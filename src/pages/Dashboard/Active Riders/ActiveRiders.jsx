// src/components/ActiveRiders.jsx
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure'

export default function ActiveRiders() {
  const [riders, setRiders] = useState([])
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const axiosSecure = UseAxiosSecure();
  // Fetch active riders from backend
  const fetchRiders = async () => {
    try {
      const res = await axiosSecure.get('/riders?status=active')
      setRiders(res.data)
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Could not load active riders', 'error')
    }
  }

  useEffect(() => {
    fetchRiders()
  }, [])

  // Open details modal
  const handleView = rider => {
    setSelected(rider)
    setModalOpen(true)
  }

  // Close modal
  const handleClose = () => {
    setModalOpen(false)
    setSelected(null)
  }

  // Deactivate a rider (set status back to pending)
  const handleDeactivate = async id => {
    const { isConfirmed } = await Swal.fire({
      title: 'Deactivate this rider?',
      text: 'They will return to the pending list.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate'
    })
    if (!isConfirmed) return

    try {
      await axiosSecure.patch(`/riders/${id}`, { status: 'pending' })
      Swal.fire('Deactivated', 'Rider moved back to pending.', 'success')
      fetchRiders()
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Could not deactivate rider', 'error')
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {['Name','Email','Region','Warehouse','Actions'].map(h => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {riders.map(r => (
              <tr key={r._id} className="border-b">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">{r.region}</td>
                <td className="px-4 py-2">{r.warehouse}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleView(r)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeactivate(r._id)}
                    className="text-red-600 hover:underline"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No active riders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {modalOpen && selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-3">Rider Details</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Name:</strong> {selected.name}</li>
              <li><strong>Age:</strong> {selected.age}</li>
              <li><strong>Email:</strong> {selected.email}</li>
              <li><strong>Region:</strong> {selected.region}</li>
              <li><strong>Warehouse:</strong> {selected.warehouse}</li>
              <li><strong>NID:</strong> {selected.nid}</li>
              <li><strong>Contact:</strong> {selected.contact}</li>
              <li><strong>Status:</strong> {selected.status}</li>
              <li><strong>Registered:</strong> {new Date(
                selected.createdAt
              ).toLocaleString()}</li>
            </ul>
            <div className="mt-4 text-right">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
