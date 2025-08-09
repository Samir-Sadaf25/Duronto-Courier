import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Contexts & Providers/AuthContext & Provider/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?user_email=${user.email}`);
      return res.data;
    },
  });

  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <div className="overflow-x-auto shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Your Payment History</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Parcel</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td>{payment.parcelId.slice(-6)}</td>
              <td>${payment.amount}</td>
              <td>{payment.paymentMethod}</td>
              <td>
                <span className={`badge ${payment.status === "succeeded" ? "badge-success" : "badge-error"}`}>
                  {payment.status}
                </span>
              </td>
              <td>{formatDate(payment.createdAt)}</td>
            </tr>
          ))}
          {payments.length === 0 && !isLoading && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-6">No payment records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
