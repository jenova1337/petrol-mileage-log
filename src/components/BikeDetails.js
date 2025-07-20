import React, { useEffect, useState } from "react";

const BikeDetails = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const storedBikes = JSON.parse(localStorage.getItem("bikes")) || [];
    setBikes(storedBikes);
  }, []);

  const getAge = (purchaseDate) => {
    const purchase = new Date(purchaseDate);
    const now = new Date();
    const diffYears = now.getFullYear() - purchase.getFullYear();
    const diffMonths = now.getMonth() - purchase.getMonth();
    const totalMonths = diffYears * 12 + diffMonths;
    return `${Math.floor(totalMonths / 12)} yr ${totalMonths % 12} mo`;
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f1f8e9", // Light green background
        border: "2px solid #689f38", // Green border
        borderRadius: "12px",
        maxWidth: "900px",
        margin: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#33691e" }}>📋 Bike Details</h2>

      {bikes.length === 0 ? (
        <p>📭 No bikes added yet.</p>
      ) : (
        bikes.map((bike, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "20px",
              padding: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid #c5e1a5",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <p><strong>Bike Name:</strong> {bike.name}</p>
            <p><strong>Model / Year:</strong> {bike.model}</p>
            <p><strong>Color:</strong> {bike.color}</p>
            <p><strong>KM Reading:</strong> {bike.km}</p>
            <p><strong>Reg. Number:</strong> {bike.registration || "N/A"}</p>
            <p><strong>Engine No:</strong> {bike.engine || "N/A"}</p>
            <p><strong>Chassis No:</strong> {bike.chassis || "N/A"}</p>
            <p><strong>Purchase Date:</strong> {bike.date}</p>
            <p><strong>Bike Age:</strong> {getAge(bike.date)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BikeDetails;
