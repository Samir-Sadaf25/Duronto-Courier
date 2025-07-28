// src/pages/BookingParcel.jsx
import React, { useMemo, useState } from "react";
import districts from "../Covarage/districts.json";
export default function BookingParcel() {
  // Parcel Info
  const [parcelType, setParcelType] = useState("document");
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");

  // Sender Info (name is prefilled from auth/user context; hard-coded here)
  const [senderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [senderRegion, setSenderRegion] = useState("");
  const [senderCenter, setSenderCenter] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [pickupInst, setPickupInst] = useState("");

  // Receiver Info
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [receiverCenter, setReceiverCenter] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [deliveryInst, setDeliveryInst] = useState("");

  const [error, setError] = useState("");

  // These would normally come from your API
  const regionOptions = useMemo(
    () => Array.from(new Set(districts.map((d) => d.region))),
    []
  );

  // 2) given a region, collect & dedupe all covered_area items
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

  // Simple cost calc demo
  const calculateCost = () => {
    let base = parcelType === "document" ? 50 : 20 * (parseFloat(weight) || 0);
    // Factor by chosen service center (just demo numbers)
    const factor =
      receiverCenter === "Center A"
        ? 1
        : receiverCenter === "Center B"
        ? 1.2
        : 1.5;
    return Math.ceil(base * factor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!title.trim()) return setError("Parcel title is required.");
    if (parcelType === "non-document" && !weight.trim())
      return setError("Weight is required for non-documents.");

    if (
      !senderContact.trim() ||
      !senderRegion ||
      !senderCenter ||
      !senderAddress.trim()
    )
      return setError("Please complete all sender fields.");
    if (
      !receiverName.trim() ||
      !receiverContact.trim() ||
      !receiverRegion ||
      !receiverCenter ||
      !receiverAddress.trim()
    )
      return setError("Please complete all receiver fields.");

    // Calculate cost & confirm
    const cost = calculateCost();
    if (!window.confirm(`Your delivery cost is ৳${cost}. Confirm booking?`))
      return;

    // Build payload
    const payload = {
      parcelType,
      title,
      weight: parcelType === "document" ? null : weight,
      sender: {
        name: senderName,
        contact: senderContact,
        region: senderRegion,
        center: senderCenter,
        address: senderAddress,
        pickupInst,
      },
      receiver: {
        name: receiverName,
        contact: receiverContact,
        region: receiverRegion,
        center: receiverCenter,
        address: receiverAddress,
        deliveryInst,
      },
      cost,
      creation_date: new Date().toISOString(),
    };

    // TODO: POST to your backend here
    console.log("✅ Saving booking:", payload);
    alert("Parcel booked successfully!");
    // Optionally reset form or redirect
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg my-12">
      <h1 className="text-2xl font-bold mb-2">Add Parcel</h1>
      <p className="text-gray-600 mb-6">Enter your parcel details below</p>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Parcel Info */}
        <fieldset className="border p-4 rounded">
          <legend className="font-semibold">Parcel Info</legend>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="document"
                checked={parcelType === "document"}
                onChange={() => setParcelType("document")}
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="non-document"
                checked={parcelType === "non-document"}
                onChange={() => setParcelType("non-document")}
              />
              Non-Document
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Parcel Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
          </div>

          {parcelType === "non-document" && (
            <div>
              <label className="block mb-1">Weight (KG)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              />
            </div>
          )}
        </fieldset>

        {/* Sender Info */}
        <div className="flex ">
          <fieldset className="w-full border p-4 rounded">
            <legend className="font-semibold">Sender Info</legend>
            <div className="mb-4">
              <label className="block mb-1">Name (You)</label>
              <input
                type="text"
                className="w-full bg-gray-100 px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Contact No</label>
              <input
                type="tel"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
                placeholder="+8801XXXXXXXXX"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Select Region</label>
                <select
                  className="w-full border px-3 py-2 mb-4"
                  value={senderRegion}
                  onChange={(e) => {
                    setSenderRegion(e.target.value);
                    setSenderCenter("");
                  }}
                  required
                >
                  <option value="">Choose region</option>
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Service Center</label>
                <select
                  className="w-full border px-3 py-2 mb-4"
                  value={senderCenter}
                  onChange={(e) => setSenderCenter(e.target.value)}
                  required
                >
                  <option value="">Choose center</option>
                  {getCenters(senderRegion).map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <textarea
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
                rows="2"
              />
            </div>
            <div>
              <label className="block mb-1">Pickup Instruction</label>
              <input
                type="text"
                value={pickupInst}
                onChange={(e) => setPickupInst(e.target.value)}
                placeholder="Leave at gate, call on arrival, etc."
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              />
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="w-full border p-4 rounded">
            <legend className="font-semibold">Receiver Info</legend>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Contact No</label>
              <input
                type="tel"
                value={receiverContact}
                onChange={(e) => setReceiverContact(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]}"
                placeholder="+8801YYYYYYYYY"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Select Region</label>
                <select
                  className="w-full border px-3 py-2 mb-4"
                  value={receiverRegion}
                  onChange={(e) => {
                    setReceiverRegion(e.target.value);
                    setReceiverCenter("");
                  }}
                  required
                >
                  <option value="">Choose region</option>
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Service Center</label>
                <select
                  className="w-full border px-3 py-2 mb-4"
                  value={receiverCenter}
                  onChange={(e) => setReceiverCenter(e.target.value)}
                  required
                >
                  <option value="">Choose center</option>
                  {getCenters(receiverRegion).map(center => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <textarea
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
                rows="2"
              />
            </div>
            <div>
              <label className="block mb-1">Delivery Instruction</label>
              <input
                type="text"
                value={deliveryInst}
                onChange={(e) => setDeliveryInst(e.target.value)}
                placeholder="Leave at reception, call on arrival, etc."
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
              />
            </div>
          </fieldset>
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
