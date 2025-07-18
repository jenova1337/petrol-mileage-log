// src/components/AddBike.js
import React, { useState } from "react";

const AddBike = () => {
  const [bike, setBike] = useState({
    name: "",
    model: "",
    kms: "",
    purchaseDate: "",
    color: "",
    regNo: "",
    engineNo: "",
    chassisNo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Manual required field check
    if (!bike.name || !bike.model || !bike.kms || !bike.purchaseDate) {
      alert("❗ Please fill all required fields.");
      return;
    }

    const bikes = JSON.parse(localStorage.getItem("bikes")) || [];
    bikes.push(bike);
    localStorage.setItem("bikes", JSON.stringify(bikes));
    alert("✅ Bike added successfully!");
    setBike({
      name: "",
      model: "",
      kms: "",
      purchaseDate: "",
      color: "",
      regNo: "",
      engineNo: "",
      chassisNo: "",
    });
  };

  return (
    <div style={{ padding: 20 }}>
      {/* 🔙 Back to Dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <input
            type="text"
            name="name"
            placeholder="Bike Name"
            value={bike.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={bike.model}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="kms"
            placeholder="KMs Run"
            value={bike.kms}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="purchaseDate"
            placeholder="Purchase Date"
            value={bike.purchaseDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={bike.color}
            onChange={handleChange}
          />
          <input
            type="text"
            name="regNo"
            placeholder="Registration No"
            value={bike.regNo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="engineNo"
            placeholder="Engine No (optional)"
            value={bike.engineNo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="chassisNo"
            placeholder="Chassis No (optional)"
            value={bike.chassisNo}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#2196F3",
              color: "#fff",
              padding: "10px 24px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🚀 Add Bike
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBike;
