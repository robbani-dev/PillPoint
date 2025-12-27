import React, { useState } from "react";

// Locations.jsx
// A simple, self-contained React component for a standard React project (no Next.js)
// - Contains 10+ example locations
// - Tailwind classes (no extra CSS required)
// - Includes a small search/filter and "Open in Google Maps" button

export default function Locations() {
  const [query, setQuery] = useState("");

  const locations = [
    {
      id: 1,
      name: "PillPoint Central Pharmacy",
      city: "Dhaka",
      address: "12 Shahbagh Rd, Dhaka 1000",
      phone: "+8801711-000001",
      hours: "8:00 AM - 10:00 PM",
      lat: 23.735,
      lng: 90.4125,
    },
    {
      id: 2,
      name: "PillPoint East Clinic Pharmacy",
      city: "Chattogram",
      address: "45 Agrabad Ave, Chattogram 4100",
      phone: "+8801711-000002",
      hours: "9:00 AM - 9:00 PM",
      lat: 22.3569,
      lng: 91.7832,
    },
    {
      id: 3,
      name: "PillPoint Northside",
      city: "Sylhet",
      address: "88 Zindabazar, Sylhet 3100",
      phone: "+8801711-000003",
      hours: "8:30 AM - 8:30 PM",
      lat: 24.8949,
      lng: 91.8687,
    },
    {
      id: 4,
      name: "PillPoint Lakeside",
      city: "Rajshahi",
      address: "10 Lake Rd, Rajshahi 6000",
      phone: "+8801711-000004",
      hours: "9:00 AM - 10:00 PM",
      lat: 24.3745,
      lng: 88.6042,
    },
    {
      id: 5,
      name: "PillPoint Greenway",
      city: "Khulna",
      address: "5 Green St, Khulna 9000",
      phone: "+8801711-000005",
      hours: "8:00 AM - 9:00 PM",
      lat: 22.8456,
      lng: 89.5403,
    },
    {
      id: 6,
      name: "PillPoint Riverside",
      city: "Barishal",
      address: "3 Riverfront Ln, Barishal 8200",
      phone: "+8801711-000006",
      hours: "8:30 AM - 10:00 PM",
      lat: 22.701,
      lng: 90.3535,
    },
    {
      id: 7,
      name: "PillPoint Hillview",
      city: "Rangamati",
      address: "7 Hill Top, Rangamati 4500",
      phone: "+8801711-000007",
      hours: "9:00 AM - 8:00 PM",
      lat: 22.6273,
      lng: 92.2185,
    },
    {
      id: 8,
      name: "PillPoint Market Branch",
      city: "Mymensingh",
      address: "101 Market Rd, Mymensingh 2200",
      phone: "+8801711-000008",
      hours: "8:00 AM - 9:00 PM",
      lat: 24.7471,
      lng: 90.4203,
    },
    {
      id: 9,
      name: "PillPoint University Outlet",
      city: "Comilla",
      address: "55 College St, Comilla 3500",
      phone: "+8801711-000009",
      hours: "8:00 AM - 10:00 PM",
      lat: 23.4607,
      lng: 91.1809,
    },
    {
      id: 10,
      name: "PillPoint Express",
      city: "Gazipur",
      address: "2 Industrial Rd, Gazipur 1700",
      phone: "+8801711-000010",
      hours: "24 Hours",
      lat: 24.0036,
      lng: 90.4265,
    },
  ];

  const filtered = locations.filter((loc) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q)
    );
  });

  return (
    <section className="container py-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="title-section">PillPoint branches</h2>
        <input
          aria-label="Search locations"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, city or address..."
          className="border border-primary rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {filtered.map((loc) => (
            <div
              key={loc.id}
              className=" rounded-2xl border border-primary shadow p-4"
            >
              <h3 className="text-lg font-medium">{loc.name}</h3>
              <p className="text-sm ">
                {loc.city} — {loc.address}
              </p>

              <div className="mt-3 text-sm ">
                <div>
                  Phone:{" "}
                  <a href={`tel:${loc.phone}`} className="underline">
                    {loc.phone}
                  </a>
                </div>
                <div>Hours: {loc.hours}</div>
              </div>

              <div className="mt-4 flex items-center gap-2 ">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                  className="btn bg-primary text-primary-content btn-sm px-3 py-1 rounded-md border"
                >
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            No locations match your search.
          </p>
        )}
      </div>
    </section>
  );
}
