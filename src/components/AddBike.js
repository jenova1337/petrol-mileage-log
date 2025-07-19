import React, { useState } from "react";

const AddBike = ({ onAdd }) => {
  const [bike, setBike] = useState({
    name: "",
    model: "",
    year: "",
    kilometers: "",
    purchaseDate: "",
    color: "",
    regNumber: "",
    engineNumber: "",
    chassisNumber: "",
  });

  const handleChange = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bike.name || !bike.model || !bike.year || !bike.kilometers || !bike.purchaseDate || !bike.color || !bike.regNumber) {
      alert("❗ Please fill all required fields.");
      return;
    }

    let existing = JSON.parse(localStorage.getItem("bikes") || "[]");
    existing.push(bike);
    localStorage.setItem("bikes", JSON.stringify(existing));
    alert("✅ Bike added!");

    if (onAdd) onAdd();

    // Reset form
    setBike({
      name: "",
      model: "",
      year: "",
      kilometers: "",
      purchaseDate: "",
      color: "",
      regNumber: "",
      engineNumber: "",
      chassisNumber: "",
    });
  };

  const inputStyle = {
    marginBottom: "12px",
    padding: "10px",
    width: "100%",
    maxWidth: "400px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>➕ Add Bike</h2>

      <input
        style={inputStyle}
        name="name"
        placeholder="Bike Name"
        value={bike.name}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="model"
        placeholder="Model"
        value={bike.model}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="year"
        placeholder="Year"
        value={bike.year}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="kilometers"
        placeholder="Kilometers Run"
        value={bike.kilometers}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="purchaseDate"
        type="date"
        value={bike.purchaseDate}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="color"
        placeholder="Color"
        value={bike.color}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="regNumber"
        placeholder="Reg Number"
        value={bike.regNumber}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="engineNumber"
        placeholder="Engine Number (optional)"
        value={bike.engineNumber}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        name="chassisNumber"
        placeholder="Chassis Number (optional)"
        value={bike.chassisNumber}
        onChange={handleChange}
      />
      <button type="submit" style={{ padding: "10px", fontSize: "16px", borderRadius: "6px", cursor: "pointer" }}>
        Save Bike
      </button>
    </form>
  );
};

export default AddBike;
