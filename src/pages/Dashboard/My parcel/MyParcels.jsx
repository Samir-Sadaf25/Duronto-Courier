// src/pages/MyParcels.jsx
import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts & Providers/AuthContext & Provider/AuthContext";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useNavigate } from "react-router";

export default function MyParcels() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const navigate = useNavigate();
  // 1) Fetch my parcels
  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
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
  const handlePay = (id) => {
    console.log("Proceed to payment for", id);
    navigate(`/dashboard/payment/${id}`);
  };

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
    <div className="max-w-3xl mx-auto space-y-2 text-center">
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
                  "From",
                  "To",
                  "Cost",
                  "payment status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="p-2 border text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody  >
              {parcels.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 ">
                  <td className="p-2 border">{p.title}</td>
                  <td className="p-2 border">{p.parcelType}</td>
                  <td className="p-2 border">{p.weight ?? "—"}</td>
                  <td className="p-2 border">{p.sender.region}</td>
                  <td className="p-2 border">{p.receiver.region}</td>
                  <td className="p-2 border">{p.cost}</td>

                  {/* payment Status */}
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
                  </td>

                  {/* Actions */}
                  
                    <td className="p-2 border flex gap-2" >
                     <td >
                       <button
                        onClick={() => handlePay(p._id)}
                        className="btn  btn-primary bg-green-300 text-black"
                      >
                        Pay
                      </button>
                     </td>
                       <td className=" ">
                      <button
                        disabled={deleteMutation.isLoading}
                        onClick={() => deleteMutation.mutate(p._id)}
                        className="btn-warning btn"
                      >
                        Cancel Delivary
                      </button>
                    </td>
                    </td>
                    {/* <td className="p-2 border">
                      <button
                        disabled={deleteMutation.isLoading}
                        onClick={() => deleteMutation.mutate(p._id)}
                        className="btn-warning btn"
                      >
                        Cancel Delivary
                      </button>
                    </td> */}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
