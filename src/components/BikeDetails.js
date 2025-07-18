import React, { useEffect, useState } from "react";

const BikeDetails = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const storedBikes = localStorage.getItem("bikes");
    if (storedBikes) {
      setBikes(JSON.parse(storedBikes));
    }
  }, []);

  const calculateBikeAge = (purchaseDate) => {
    const purchase = new Date(purchaseDate);
    const now = new Date();
    const diff = now - purchase;
    const ageInYears = diff / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(1);
  };

  if (bikes.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <p>No bike data found. Please add a bike.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        overflowX: "auto",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>📋 Bike Details</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd" }}>
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>KMs</th>
            <th style={thStyle}>Purchase Date</th>
            <th style={thStyle}>Age (Years)</th>
            <th style={thStyle}>Color</th>
            <th style={thStyle}>Reg. No</th>
            <th style={thStyle}>Engine No</th>
            <th style={thStyle}>Chassis No</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike, index) => (
            <tr key={index} style={{ textAlign: "center" }}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{bike.name}</td>
              <td style={tdStyle}>{bike.model}</td>
              <td style={tdStyle}>{bike.kms}</td>
              <td style={tdStyle}>{bike.purchaseDate}</td>
              <td style={tdStyle}>{calculateBikeAge(bike.purchaseDate)}</td>
              <td style={tdStyle}>{bike.color}</td>
              <td style={tdStyle}>{bike.regNo}</td>
              <td style={tdStyle}>{bike.engineNo || "-"}</td>
              <td style={tdStyle}>{bike.chassisNo || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  background: "#eee",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
};

export default BikeDetails;
