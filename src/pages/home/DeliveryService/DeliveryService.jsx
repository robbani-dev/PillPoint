import React, { useState } from "react";
import Swal from "sweetalert2";

export default function DeliveryService() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    pickupAddress: "",
    recipientName: "",
    recipientPhone: "",
    deliveryAddress: "",
    packageDetails: "",
    deliveryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Delivery Service Request:", formData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your delivery request has been submitted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setFormData({
      senderName: "",
      senderPhone: "",
      pickupAddress: "",
      recipientName: "",
      recipientPhone: "",
      deliveryAddress: "",
      packageDetails: "",
      deliveryDate: "",
    });
  };

  return (
    <div className="container">
      <h2 className="title-section">Delivery Service</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* Sender Name */}
        <div>
          <label className="block  font-medium mb-1">Sender Name</label>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Sender Phone */}
        <div>
          <label className="block  font-medium mb-1">Sender Phone</label>
          <input
            type="tel"
            name="senderPhone"
            value={formData.senderPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Pickup Address */}
        <div className="lg:col-span-2">
          <label className="block  font-medium mb-1">Pickup Address</label>
          <textarea
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block  font-medium mb-1">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Recipient Phone */}
        <div>
          <label className="block  font-medium mb-1">Recipient Phone</label>
          <input
            type="tel"
            name="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Delivery Address */}
        <div className="lg:col-span-2">
          <label className="block  font-medium mb-1">Delivery Address</label>
          <textarea
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Package Details */}
        <div className="lg:col-span-2">
          <label className="block  font-medium mb-1">Package Details</label>
          <textarea
            name="packageDetails"
            value={formData.packageDetails}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block  font-medium mb-1">
            Preferred Delivery Date
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Submit Delivery Request
          </button>
        </div>
      </form>
    </div>
  );
}
