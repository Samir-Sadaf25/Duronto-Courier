// src/components/PendingRiders.jsx
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure'

export default function PendingRiders() {
  const [riders, setRiders] = useState([])
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const axiosSecure = UseAxiosSecure();
  // 1. Fetch pending riders
  const fetchRiders = async () => {
    try {
      const res = await axiosSecure.get('/riders?status=pending')
      setRiders(res.data)
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Could not load pending riders', 'error')
    }
  }

  useEffect(() => {
    fetchRiders()
  }, [])

  // 2. Handlers
  const handleView = (rider) => {
    setSelected(rider)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setSelected(null)
  }

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: 'Approve this rider?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
    })
    if (!result.isConfirmed) return

    try {
      await axiosSecure.patch(`/riders/${id}`, { status: 'active' })
      Swal.fire('Approved!', 'Rider is now active.', 'success')
      fetchRiders()
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Failed to approve rider', 'error')
    }
  }

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: 'Reject this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
    })
    if (!result.isConfirmed) return

    try {
      await axiosSecure.delete(`/riders/${id}`)
      Swal.fire('Rejected', 'Application has been removed.', 'success')
      fetchRiders()
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Failed to reject rider', 'error')
    }
  }

  // 3. Render
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {['Name','Email','Region','Warehouse','Actions'].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-sm font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {riders.map((r) => (
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
                    onClick={() => handleApprove(r._id)}
                    className="text-green-600 hover:underline"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(r._id)}
                    className="text-red-600 hover:underline"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No pending riders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Modal for rider details */}
      {modalOpen && selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
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
