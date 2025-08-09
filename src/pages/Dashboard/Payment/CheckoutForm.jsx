import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Contexts & Providers/AuthContext & Provider/AuthContext";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();         // parcelId
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [clientSecret, setClientSecret] = useState("");
  const [ferror, setFerror] = useState("");

  // Fetch parcel info
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const amount = parcelInfo?.cost || 0;

  // Create PaymentIntent on mount
  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          amount,
          currency: "usd",
          parcelId: id,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [amount, id, axiosSecure]);

  // Save payment history + update parcel status
  const paymentMutation = useMutation({
    mutationFn: (payload) => axiosSecure.post("/payments", payload),
    onSuccess: () => {
      // Refresh relevant queries
      queryClient.invalidateQueries(["my-parcels", user?.email]);
      queryClient.invalidateQueries(["parcels", id]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

   const { error, paymentMethod } = await stripe.createPaymentMethod({
  type: "card",
  card,
  billing_details: {
    email: user.email,
    name: user.displayName,
  },
});

    if (error) {
      setFerror(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
     await stripe.confirmCardPayment(clientSecret, {
  payment_method: paymentMethod.id
});

    if (confirmError) {
      setFerror(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Save payment to backend
      await paymentMutation.mutateAsync({
        parcelId: id,
        amount,
        currency: "usd",
        user_email: user.email,
        paymentIntentId: paymentIntent.id,
        paymentMethod: "card",
        status: "succeeded",
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment completed successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/dashboard");
    }
  };

  if (isPending) return <p className="text-center py-4">Loading parcel info…</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 shadow bg-white text-lg font-semibold rounded"
    >
      <CardElement className="p-4 border rounded-md" />
      <button
        type="submit"
        className="btn bg-[#CAEB66] w-full"
        disabled={!stripe || !clientSecret || paymentMutation.isLoading}
      >
        Pay ${amount} for this parcel
      </button>
      {ferror && <p className="text-red-500">{ferror}</p>}
    </form>
  );
};

export default CheckoutForm;
