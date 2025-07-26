import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import districts from "./districts.json";
import pinUrl from "../../assets/icons8-location-50.png";

// Default Leaflet Icon fix
const DefaultIcon = L.Icon.Default.extend({
  options: {
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [0, -45],
    shadowSize: [41, 41],
  },
});
L.Marker.prototype.options.icon = new DefaultIcon();

// Custom pin icon
const locationIcon = new L.Icon({
  iconUrl: pinUrl,
  iconSize: [24, 30],
  iconAnchor: [12, 30],
  popupAnchor: [0, -35],
  tooltipAnchor: [0, -30],
});

export default function Coverage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = districts.filter((d) =>
    d.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white py-16">
      {/* Header & Search */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#03373D] mb-4">
          Coverage Area
        </h2>
        <div className="flex max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search district…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
          />
          <button
            className="px-6 bg-[#CAEB66] text-[#03373D] font-medium rounded-r-lg hover:bg-opacity-90 transition"
            onClick={() => {}}
          >
            Search
          </button>
        </div>
        <p className="text-gray-600 mb-8">
          We are available in {filtered.length} districts
        </p>
      </div>

      {/* Map & Markers */}
      <div className="mx-auto max-w-5xl px-6">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={false}
          className="h-96 w-full rounded-lg shadow"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filtered.map((d, i) => (
            <Marker
              key={i}
              position={[d.latitude, d.longitude]}
              icon={locationIcon}

              /* Open tooltip on hover, close on mouseout */
              eventHandlers={{
                mouseover: (e) => e.target.openTooltip(),
                mouseout: (e) => e.target.closeTooltip(),
              }}
            >
              {/* This tooltip appears on hover */}
              <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                {d.covered_area.join(", ")}
              </Tooltip>

              {/* Keep your popup for click */}
              <Popup>
                <div className="space-y-1">
                  <h3 className="font-semibold">{d.district}</h3>
                  <p>Region: {d.region}</p>
                  <p>Covered Areas: {d.covered_area.join(", ")}</p>
                  <p>Status: {d.status}</p>
                  {d.flowchart && (
                    <a
                      href={d.flowchart}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#CAEB66] hover:underline"
                    >
                      View Flowchart
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
