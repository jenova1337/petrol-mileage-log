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

  const [bikes, setBikes] = useState(() => {
    const saved = localStorage.getItem("bikes");
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBike((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBikes = [...bikes, bike];
    localStorage.setItem("bikes", JSON.stringify(updatedBikes));
    setBikes(updatedBikes);
    alert("Bike added successfully!");
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
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>➕ Add Bike</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Bike Name", name: "name" },
          { label: "Model / Year", name: "model" },
          { label: "Kilometers", name: "kms" },
          { label: "Purchase Date", name: "purchaseDate", type: "date" },
          { label: "Color", name: "color" },
          { label: "Registration No.", name: "regNo" },
          { label: "Engine No. (optional)", name: "engineNo" },
          { label: "Chassis No. (optional)", name: "chassisNo" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} style={{ marginBottom: "12px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
              {label}:
            </label>
            <input
              type={type}
              name={name}
              value={bike[name]}
              onChange={handleChange}
              required={name !== "engineNo" && name !== "chassisNo"}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 24px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Add Bike
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBike;
