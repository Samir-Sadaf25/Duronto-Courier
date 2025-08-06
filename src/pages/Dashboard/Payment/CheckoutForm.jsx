import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
// import { p } from "motion/react-client";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Contexts & Providers/AuthContext & Provider/AuthContext";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const elements = useElements();
  //const [clientSecret, setClientSecret] = useState("");
  const [ferror, setFerror] = useState("");
  const { id } = useParams();
  const parcelId = id;
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return "Loading....";
  }
  const { cost } = parcelInfo;
  const amount = cost;

  const handleSubmit = async (e) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setFerror(error.message);
      console.log("[error]", error);
    } else {
      setFerror("");
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
        currency: "usd",
        parcelId: id,
      });
      const clientSecret = res.data.clientSecret;
      if (!clientSecret) {
        return;
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
          },
        },
      });
      if (result.error) {
        setFerror(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "payment completed",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 shadow bg-white text-xl font-bold lg:w-2xl"
      >
        <CardElement className="p-6 border rounded-xl"></CardElement>
        <button
          className="btn bg-[#CAEB66] w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay {cost}$ for the parcel
        </button>
        {ferror && <p className="text-red-500 p-2">{ferror}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
