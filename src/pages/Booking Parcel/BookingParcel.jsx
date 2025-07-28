// src/pages/BookingParcel.jsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import districts from "../Covarage/districts.json";

// Helper: get unique regions
const regionOptions = Array.from(new Set(districts.map((d) => d.region)));
// Helper: get centers for a region
const getCenters = (region) => {
  if (!region) return [];
  return Array.from(
    new Set(
      districts
        .filter((d) => d.region === region)
        .flatMap((d) => d.covered_area || [])
    )
  );
};

// Pricing logic as per requirements
function calculateCost({
  parcelType,
  weight = 0,
  senderRegion,
  receiverRegion,
}) {
  const isWithinDistrict = senderRegion === receiverRegion;
  if (parcelType === "document") {
    return {
      base: isWithinDistrict ? 60 : 80,
      extra: 0,
      total: isWithinDistrict ? 60 : 80,
      breakdown: `Document (${isWithinDistrict ? "Within" : "Outside"} District)`
    };
  }
  // Non-document
  const w = parseFloat(weight) || 0;
  if (w <= 3) {
    const base = isWithinDistrict ? 110 : 150;
    return {
      base,
      extra: 0,
      total: base,
      breakdown: `Non-Document, up to 3kg (${isWithinDistrict ? "Within" : "Outside"} District)`
    };
  } else {
    // >3kg
    const base = isWithinDistrict ? 110 : 150;
    const extraKg = w - 3;
    const extra = Math.ceil(extraKg) * 40;
    let total = base + extra;
    let breakdown = `Non-Document, ${w}kg (${isWithinDistrict ? "Within" : "Outside"} District): Base ৳${base} + ৳40/kg over 3kg`;
    if (!isWithinDistrict) {
      // For outside district, add extra 40
      total += 40;
      breakdown += ` + ৳40 extra (outside district)`;
    }
    return { base, extra, total, breakdown };
  }
}

// Modular form sections
const ParcelInfo = ({ control, watch }) => {
  const parcelType = watch("parcelType");
  return (
    <fieldset className="border p-4 rounded">
      <legend className="font-semibold">Parcel Info</legend>
      <div className="flex items-center gap-6 mb-4">
        <label className="flex items-center gap-2">
          <Controller
            name="parcelType"
            control={control}
            render={({ field }) => (
              <input
                type="radio"
                value="document"
                checked={field.value === "document"}
                onChange={() => field.onChange("document")}
              />
            )}
          />
          Document
        </label>
        <label className="flex items-center gap-2">
          <Controller
            name="parcelType"
            control={control}
            render={({ field }) => (
              <input
                type="radio"
                value="non-document"
                checked={field.value === "non-document"}
                onChange={() => field.onChange("non-document")}
              />
            )}
          />
          Non-Document
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Parcel Title</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Parcel title is required." }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
          )}
        />
      </div>
      {parcelType === "non-document" && (
        <div>
          <label className="block mb-1">Weight (KG)</label>
          <Controller
            name="weight"
            control={control}
            rules={{
              required: "Weight is required for non-documents.",
              min: { value: 0.1, message: "Weight must be positive." },
            }}
            render={({ field }) => (
              <input
                type="number"
                min="0.1"
                step="0.1"
                {...field}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              />
            )}
          />
        </div>
      )}
    </fieldset>
  );
};

const SenderInfo = ({ control, watch }) => {
  const senderRegion = watch("senderRegion");
  return (
    <fieldset className="w-full border p-4 rounded">
      <legend className="font-semibold">Sender Info</legend>
      <div className="mb-4">
        <label className="block mb-1">Name (You)</label>
        <Controller
          name="senderName"
          control={control}
          render={({ field }) => (
            <input type="text" {...field} className="w-full bg-gray-100 px-3 py-2 rounded" />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contact No</label>
        <Controller
          name="senderContact"
          control={control}
          rules={{ required: "Sender contact is required." }}
          render={({ field }) => (
            <input
              type="tel"
              {...field}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              placeholder="+8801XXXXXXXXX"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Select Region</label>
          <Controller
            name="senderRegion"
            control={control}
            rules={{ required: "Sender region is required." }}
            render={({ field }) => (
              <select
                className="w-full border px-3 py-2 mb-4"
                {...field}
              >
                <option value="">Choose region</option>
                {regionOptions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            )}
          />
        </div>
        <div>
          <label className="block mb-1">Service Center</label>
          <Controller
            name="senderCenter"
            control={control}
            rules={{ required: "Sender center is required." }}
            render={({ field }) => (
              <select
                className="w-full border px-3 py-2 mb-4"
                {...field}
              >
                <option value="">Choose center</option>
                {getCenters(senderRegion).map((center) => (
                  <option key={center} value={center}>{center}</option>
                ))}
              </select>
            )}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Address</label>
        <Controller
          name="senderAddress"
          control={control}
          rules={{ required: "Sender address is required." }}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              rows="2"
            />
          )}
        />
      </div>
      <div>
        <label className="block mb-1">Pickup Instruction</label>
        <Controller
          name="pickupInst"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              placeholder="Leave at gate, call on arrival, etc."
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
          )}
        />
      </div>
    </fieldset>
  );
};

const ReceiverInfo = ({ control, watch }) => {
  const receiverRegion = watch("receiverRegion");
  return (
    <fieldset className="w-full border p-4 rounded">
      <legend className="font-semibold">Receiver Info</legend>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <Controller
          name="receiverName"
          control={control}
          rules={{ required: "Receiver name is required." }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contact No</label>
        <Controller
          name="receiverContact"
          control={control}
          rules={{ required: "Receiver contact is required." }}
          render={({ field }) => (
            <input
              type="tel"
              {...field}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              placeholder="+8801YYYYYYYYY"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Select Region</label>
          <Controller
            name="receiverRegion"
            control={control}
            rules={{ required: "Receiver region is required." }}
            render={({ field }) => (
              <select
                className="w-full border px-3 py-2 mb-4"
                {...field}
              >
                <option value="">Choose region</option>
                {regionOptions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            )}
          />
        </div>
        <div>
          <label className="block mb-1">Service Center</label>
          <Controller
            name="receiverCenter"
            control={control}
            rules={{ required: "Receiver center is required." }}
            render={({ field }) => (
              <select
                className="w-full border px-3 py-2 mb-4"
                {...field}
              >
                <option value="">Choose center</option>
                {getCenters(receiverRegion).map((center) => (
                  <option key={center} value={center}>{center}</option>
                ))}
              </select>
            )}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Address</label>
        <Controller
          name="receiverAddress"
          control={control}
          rules={{ required: "Receiver address is required." }}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              rows="2"
            />
          )}
        />
      </div>
      <div>
        <label className="block mb-1">Delivery Instruction</label>
        <Controller
          name="deliveryInst"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              placeholder="Leave at reception, call on arrival, etc."
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
          )}
        />
      </div>
    </fieldset>
  );
};

export default function BookingParcel() {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
      title: "",
      weight: "",
      senderName: "",
      senderContact: "",
      senderRegion: "",
      senderCenter: "",
      senderAddress: "",
      pickupInst: "",
      receiverName: "",
      receiverContact: "",
      receiverRegion: "",
      receiverCenter: "",
      receiverAddress: "",
      deliveryInst: "",
    },
  });

  const parcelType = watch("parcelType");
  const weight = watch("weight");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Pricing preview
  const pricing = calculateCost({
    parcelType,
    weight,
    senderRegion,
    receiverRegion,
  });

  // SweetAlert2 confirmation
  const onSubmit = async (data) => {
    const pricing = calculateCost({
      parcelType: data.parcelType,
      weight: data.weight,
      senderRegion: data.senderRegion,
      receiverRegion: data.receiverRegion,
    });
    const breakdownHtml = `
      <div style='text-align:left'>
        <b>Pricing Breakdown:</b><br/>
        ${pricing.breakdown}<br/>
        Base: ৳${pricing.base}<br/>
        ${pricing.extra ? `Extra: ৳${pricing.extra}<br/>` : ""}
        <b>Total: ৳${pricing.total}</b>
      </div>
    `;
    const result = await Swal.fire({
      title: "Confirm Booking?",
      html: breakdownHtml,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
   
      
      // TODO: POST to backend here
      await Swal.fire({
        title: "Booked!",
        text: "Your parcel has been booked.",
        icon: "success",
      });
      reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg my-12">
      <h1 className="text-2xl font-bold mb-2">Add Parcel</h1>
      <p className="text-gray-600 mb-6">Enter your parcel details below</p>

      {/* Show first error if any */}
      {Object.values(errors)[0] && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
          {Object.values(errors)[0].message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <ParcelInfo control={control} watch={watch} />

        <div className="flex flex-col md:flex-row gap-4">
          <SenderInfo control={control} watch={watch} />
          <ReceiverInfo control={control} watch={watch} />
        </div>

        {/* Pricing Preview */}
        <div className="text-right text-lg font-semibold text-[#03373D]">
          Estimated Cost: <span className="text-[#CAEB66]">৳{pricing.total}</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#CAEB66] text-[#03373D] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
}
