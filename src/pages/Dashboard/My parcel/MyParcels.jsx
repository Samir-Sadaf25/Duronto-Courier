// src/pages/MyParcels.jsx
import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts & Providers/AuthContext & Provider/AuthContext";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

export default function MyParcels() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  // 1) Fetch my parcels
  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?user_email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 2) Cancel (DELETE) mutation
  const deleteMutation = useMutation({
  mutationFn: (id) => axiosSecure.delete(`/parcels/${id}`),
  onSuccess: () => {
    qc.invalidateQueries(["my-parcels", user.email]);
  },
});

const updateMutation = useMutation({
  mutationFn: ({ id, updates }) =>
    axiosSecure.patch(`/parcels/${id}`, updates),
  onSuccess: () => {
    qc.invalidateQueries(["my-parcels", user.email]);
  },
});

  // Loading / error / auth states
  if (!user) {
    return <p className="p-4">Please sign in to view your parcels.</p>;
  }
  if (isLoading) {
    return <p className="p-4">Loading your parcels…</p>;
  }
  if (isError) {
    return <p className="p-4 text-red-600">{error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Booked Parcels</h1>

      {parcels.length === 0 ? (
        <p>You have no parcels booked yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Title",
                  "Type",
                  "Weight",
                  "Region",
                  "Center",
                  "Pickup Inst.",
                  "Payment",
                  "Delivery",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="p-2 border text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parcels.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{p.title}</td>
                  <td className="p-2 border">{p.parcelType}</td>
                  <td className="p-2 border">{p.weight ?? "—"}</td>
                  <td className="p-2 border">{p.sender.region}</td>
                  <td className="p-2 border">{p.sender.center}</td>
                  <td className="p-2 border">{p.sender.pickupInst}</td>

                  {/* Payment Status */}
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        p.paymentStatus === "paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {p.paymentStatus || "unpaid"}
                    </span>
                    {p.paymentStatus !== "paid" && (
                      <button
                        disabled={updateMutation.isLoading}
                        onClick={() =>
                          updateMutation.mutate({
                            id: p._id,
                            updates: { paymentStatus: "paid" },
                          })
                        }
                        className="ml-2 text-blue-600 hover:underline text-sm"
                      >
                        Pay
                      </button>
                    )}
                  </td>

                  {/* Delivery Status */}
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        p.deliveryStatus === "delivered"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {p.deliveryStatus || "pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-2 border">
                    <button
                      disabled={deleteMutation.isLoading}
                      onClick={() => deleteMutation.mutate(p._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
