import React, { useState } from "react";

// DoctorAppointment.jsx
// Single-file React component (default export) for a Doctors Appointment page.
// - Uses TailwindCSS classes for styling (ensure Tailwind is set up in your project)
// - Contains 20 sample doctors with available slots
// - Features: search, specialty filter, sort, list view, booking modal with basic validation

export default function DoctorAppointment() {
  const initialDoctors = [
    {
      id: 1,
      name: "Dr. Nora Islam",
      specialty: "Cardiology",
      experience: 12,
      rating: 4.8,
      location: "Dhaka Central Hospital",
      fee: 1200,
      avatar: "https://i.pravatar.cc/100?img=11",
      availableSlots: ["2025-11-03 09:00", "2025-11-03 11:00", "2025-11-04 14:00"],
    },
    {
      id: 2,
      name: "Dr. Ahmed Faruque",
      specialty: "General Medicine",
      experience: 8,
      rating: 4.6,
      location: "Garden Clinic",
      fee: 600,
      avatar: "https://i.pravatar.cc/100?img=12",
      availableSlots: ["2025-11-02 10:00", "2025-11-02 15:00", "2025-11-05 09:30"],
    },
    {
      id: 3,
      name: "Dr. Sanjana Roy",
      specialty: "Pediatrics",
      experience: 6,
      rating: 4.7,
      location: "Kids Care Hospital",
      fee: 700,
      avatar: "https://i.pravatar.cc/100?img=13",
      availableSlots: ["2025-11-06 09:00", "2025-11-06 10:30", "2025-11-07 13:00"],
    },
    {
      id: 4,
      name: "Dr. Rafiq Hossain",
      specialty: "Orthopedics",
      experience: 15,
      rating: 4.9,
      location: "Bone & Joint Center",
      fee: 1500,
      avatar: "https://i.pravatar.cc/100?img=14",
      availableSlots: ["2025-11-03 08:30", "2025-11-04 12:00", "2025-11-07 16:00"],
    },
    {
      id: 5,
      name: "Dr. Laila Karim",
      specialty: "Dermatology",
      experience: 9,
      rating: 4.5,
      location: "SkinCare Clinic",
      fee: 800,
      avatar: "https://i.pravatar.cc/100?img=15",
      availableSlots: ["2025-11-05 11:00", "2025-11-05 14:00", "2025-11-08 10:00"],
    },
    {
      id: 6,
      name: "Dr. Mahbub Alam",
      specialty: "ENT",
      experience: 11,
      rating: 4.4,
      location: "City ENT Center",
      fee: 700,
      avatar: "https://i.pravatar.cc/100?img=16",
      availableSlots: ["2025-11-02 09:30", "2025-11-03 13:00", "2025-11-06 15:30"],
    },
    {
      id: 7,
      name: "Dr. Sufia Begum",
      specialty: "Gynecology",
      experience: 13,
      rating: 4.8,
      location: "Mother & Child Hospital",
      fee: 1300,
      avatar: "https://i.pravatar.cc/100?img=17",
      availableSlots: ["2025-11-04 09:00", "2025-11-04 11:30", "2025-11-07 14:30"],
    },
    {
      id: 8,
      name: "Dr. Rashed Khan",
      specialty: "Neurology",
      experience: 18,
      rating: 4.9,
      location: "Brain Care Institute",
      fee: 2000,
      avatar: "https://i.pravatar.cc/100?img=18",
      availableSlots: ["2025-11-09 10:00", "2025-11-10 13:00", "2025-11-12 09:00"],
    },
    {
      id: 9,
      name: "Dr. Farhana Zaman",
      specialty: "Ophthalmology",
      experience: 7,
      rating: 4.3,
      location: "Eye Care Center",
      fee: 900,
      avatar: "https://i.pravatar.cc/100?img=19",
      availableSlots: ["2025-11-02 14:00", "2025-11-03 10:00", "2025-11-06 11:00"],
    },
    {
      id: 10,
      name: "Dr. Imran Siddique",
      specialty: "Endocrinology",
      experience: 10,
      rating: 4.6,
      location: "Hormone Clinic",
      fee: 1400,
      avatar: "https://i.pravatar.cc/100?img=20",
      availableSlots: ["2025-11-05 09:00", "2025-11-05 13:00", "2025-11-09 15:00"],
    },
    {
      id: 11,
      name: "Dr. Nazmul Hassan",
      specialty: "Psychiatry",
      experience: 14,
      rating: 4.7,
      location: "MindWell Center",
      fee: 1100,
      avatar: "https://i.pravatar.cc/100?img=21",
      availableSlots: ["2025-11-03 10:00", "2025-11-06 16:00", "2025-11-08 09:30"],
    },
    {
      id: 12,
      name: "Dr. Jahanara Khatun",
      specialty: "Nephrology",
      experience: 16,
      rating: 4.8,
      location: "Kidney Care Hospital",
      fee: 1700,
      avatar: "https://i.pravatar.cc/100?img=22",
      availableSlots: ["2025-11-11 09:00", "2025-11-11 11:00", "2025-11-13 14:00"],
    },
    {
      id: 13,
      name: "Dr. Omar Sayeed",
      specialty: "Oncology",
      experience: 20,
      rating: 4.9,
      location: "Cancer Care Center",
      fee: 2500,
      avatar: "https://i.pravatar.cc/100?img=23",
      availableSlots: ["2025-11-15 10:00", "2025-11-16 10:00", "2025-11-18 13:00"],
    },
    {
      id: 14,
      name: "Dr. Mimi Chowdhury",
      specialty: "Psychology",
      experience: 5,
      rating: 4.2,
      location: "Wellness Hub",
      fee: 800,
      avatar: "https://i.pravatar.cc/100?img=24",
      availableSlots: ["2025-11-02 12:00", "2025-11-04 15:00", "2025-11-09 09:00"],
    },
    {
      id: 15,
      name: "Dr. Khaled Mustafa",
      specialty: "Urology",
      experience: 12,
      rating: 4.6,
      location: "UroCare Clinic",
      fee: 1300,
      avatar: "https://i.pravatar.cc/100?img=25",
      availableSlots: ["2025-11-07 10:00", "2025-11-08 11:30", "2025-11-10 14:30"],
    },
    {
      id: 16,
      name: "Dr. Ayesha Siddiqui",
      specialty: "Dental",
      experience: 9,
      rating: 4.5,
      location: "Smile Dental Clinic",
      fee: 500,
      avatar: "https://i.pravatar.cc/100?img=26",
      availableSlots: ["2025-11-03 09:00", "2025-11-03 10:30", "2025-11-05 12:00"],
    },
    {
      id: 17,
      name: "Dr. Tarek Mahmood",
      specialty: "Gastroenterology",
      experience: 11,
      rating: 4.7,
      location: "Digestive Health Center",
      fee: 1500,
      avatar: "https://i.pravatar.cc/100?img=27",
      availableSlots: ["2025-11-04 09:30", "2025-11-06 11:00", "2025-11-07 13:30"],
    },
    {
      id: 18,
      name: "Dr. Rina Das",
      specialty: "Physiotherapy",
      experience: 7,
      rating: 4.4,
      location: "Rehab Center",
      fee: 600,
      avatar: "https://i.pravatar.cc/100?img=28",
      availableSlots: ["2025-11-02 09:00", "2025-11-05 10:00", "2025-11-09 15:00"],
    },
    {
      id: 19,
      name: "Dr. Sohail Azim",
      specialty: "Pulmonology",
      experience: 13,
      rating: 4.6,
      location: "Lung Care Clinic",
      fee: 1400,
      avatar: "https://i.pravatar.cc/100?img=29",
      availableSlots: ["2025-11-06 09:00", "2025-11-07 11:00", "2025-11-10 10:00"],
    },
    {
      id: 20,
      name: "Dr. Meherun Nahar",
      specialty: "Rheumatology",
      experience: 10,
      rating: 4.5,
      location: "Joint Care Center",
      fee: 1200,
      avatar: "https://i.pravatar.cc/100?img=30",
      availableSlots: ["2025-11-08 09:00", "2025-11-10 14:00", "2025-11-12 09:30"],
    },
  ];

  const [doctors] = useState(initialDoctors);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({ patientName: "", phone: "", slot: "" });
  const [bookings, setBookings] = useState([]);

  const specialties = ["All", ...Array.from(new Set(doctors.map((d) => d.specialty)))];

  const filtered = doctors
    .filter((d) => (specialty === "All" ? true : d.specialty === specialty))
    .filter((d) =>
      [d.name, d.specialty, d.location].join(" ").toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "fee") return a.fee - b.fee;
      return 0;
    });

  function openBooking(doctor) {
    setSelectedDoctor(doctor);
    setBookingForm({ patientName: "", phone: "", slot: doctor.availableSlots[0] || "" });
    setShowModal(true);
  }

  function handleBookSubmit(e) {
    e.preventDefault();
    // basic validation
    if (!bookingForm.patientName.trim() || !bookingForm.phone.trim() || !bookingForm.slot) {
      alert("Please fill all booking fields.");
      return;
    }

    // create booking record
    const newBooking = {
      id: Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      patientName: bookingForm.patientName,
      phone: bookingForm.phone,
      slot: bookingForm.slot,
    };

    setBookings((s) => [newBooking, ...s]);
    setShowModal(false);
    alert(`Appointment confirmed with ${selectedDoctor.name} on ${bookingForm.slot}`);
  }

  return (
    <div className="contain">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Book a Doctor Appointment</h1>
        <p className="text-sm">Search, filter and book from our list of verified doctors.</p>
      </header>

      <section className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 flex gap-2">
          <input
            className="flex-1 p-2 border rounded-md"
            placeholder="Search by name, specialty or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="p-2 border rounded-md select" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select className="p-2 border rounded-md select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Sort: Rating</option>
            <option value="experience">Sort: Experience</option>
            <option value="fee">Sort: Fee (low to high)</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="text-sm ">Total doctors: <span className="font-semibold">{filtered.length}</span></div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
            <img src={doc.avatar} alt={doc.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{doc.name}</h2>
                  <div className="text-sm text-gray-600">{doc.specialty} • {doc.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Experience: <span className="font-medium">{doc.experience} yrs</span></div>
                  <div className="text-sm">Rating: <span className="font-medium">{doc.rating}</span></div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-700">Fee: ৳{doc.fee}</div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    onClick={() => openBooking(doc)}
                  >
                    Book
                  </button>
                  <button
                    className="px-3 py-1 border rounded-md text-sm"
                    onClick={() => window.alert(`Visiting details for ${doc.name}:\nLocation: ${doc.location}\nAvailable slots: ${doc.availableSlots.join(", ")}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Booking Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-primary rounded-lg w-full max-w-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Book Appointment — {selectedDoctor.name}</h3>
              <button className="text-gray-600" onClick={() => setShowModal(false)}>Close</button>
            </div>
            <form onSubmit={handleBookSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Patient name</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={bookingForm.patientName}
                    onChange={(e) => setBookingForm((s) => ({ ...s, patientName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm">Phone</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm((s) => ({ ...s, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm">Select slot</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={bookingForm.slot}
                    onChange={(e) => setBookingForm((s) => ({ ...s, slot: e.target.value }))}
                    required
                  >
                    {selectedDoctor.availableSlots.map((slt) => (
                      <option key={slt} value={slt}>{slt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bookings list (simple) */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Your Recent Bookings</h3>
        {bookings.length === 0 ? (
          <div className="text-sm text-gray-500">No bookings yet. Book an appointment to see it listed here.</div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{b.doctorName}</div>
                  <div className="text-sm text-gray-600">{b.patientName} • {b.slot}</div>
                </div>
                <div className="text-sm text-gray-700">Phone: {b.phone}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
