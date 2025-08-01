// src/pages/MyParcels.jsx
import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Contexts & Providers/AuthContext & Provider/AuthContext';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

export default function MyParcels() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],     // default to empty array
    isPending,              // initial loading (formerly isLoading)
    isError,
    error,
  } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?user_email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,  // only run once email exists
  });

  if (!user) {
    return <p className="p-4">Please sign in to view your booked parcels.</p>;
  }

  if (isPending) {
    return <p className="p-4">Loading your parcels…</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-600">{error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Booked Parcels</h1>

      {parcels.length === 0 ? (
        <p>You have no parcels booked yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {['Title','Type','Weight','Region','Center','Address','Pickup'].map(h => (
                <th key={h} className="p-2 border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parcels.map(p => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">{p.parcelType}</td>
                <td className="p-2 border">{p.weight ?? '—'}</td>
                <td className="p-2 border">{p.sender.region}</td>
                <td className="p-2 border">{p.sender.center}</td>
                <td className="p-2 border">{p.sender.address}</td>
                <td className="p-2 border">{p.sender.pickupInst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
