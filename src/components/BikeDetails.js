import React, { useEffect, useState } from "react";

const BikeDetails = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const savedBikes = JSON.parse(localStorage.getItem("bikes") || "[]");
    setBikes(savedBikes);
  }, []);

  const getAge = (purchaseDate) => {
    if (!purchaseDate) return "N/A";
    const purchase = new Date(purchaseDate);
    const today = new Date();

    let years = today.getFullYear() - purchase.getFullYear();
    let months = today.getMonth() - purchase.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months`;
  };

  return (
    <div style={{ padding: "20px", background: "#f4fafd", border: "2px solid #2196f3", borderRadius: "12px", maxWidth: 900, margin: "auto" }}>
      <h2 style={{ color: "#0d47a1" }}>📋 Your Bike Details</h2>
      {bikes.length === 0 ? (
        <p>No bikes added yet.</p>
      ) : (
        bikes.map((bike, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              padding: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid #bbdefb",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>Name:</strong> {bike.name || "N/A"}</p>
            <p><strong>Model & Year:</strong> {bike.model || "N/A"} ({bike.year || "N/A"})</p>
            <p><strong>Kilometers Run:</strong> {bike.kilometers || "N/A"}</p>
            <p><strong>Purchase Date:</strong> {bike.purchaseDate || "N/A"}</p>
            <p><strong>Age:</strong> {getAge(bike.purchaseDate)}</p>
            <p><strong>Color:</strong> {bike.color || "N/A"}</p>
            <p><strong>Reg Number:</strong> {bike.regNumber || "N/A"}</p>
            <p><strong>Engine No:</strong> {bike.engineNumber || "N/A"}</p>
            <p><strong>Chassis No:</strong> {bike.chassisNumber || "N/A"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BikeDetails;
