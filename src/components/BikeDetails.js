// src/components/BikeDetails.js
import React, { useEffect, useState } from "react";

const BikeDetails = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const savedBikes = JSON.parse(localStorage.getItem("bikes") || "[]");
    setBikes(savedBikes);
  }, []);

  const getAge = (purchaseDate) => {
    const purchase = new Date(purchaseDate);
    const today = new Date();
    const years = today.getFullYear() - purchase.getFullYear();
    const months = today.getMonth() - purchase.getMonth();
    return `${years} years, ${months >= 0 ? months : months + 12} months`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Your Bike Details</h2>
      {bikes.length === 0 ? (
        <p>No bikes added yet.</p>
      ) : (
        bikes.map((bike, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <p><strong>Name:</strong> {bike.name}</p>
            <p><strong>Model & Year:</strong> {bike.model} ({bike.year})</p>
            <p><strong>Kilometers Run:</strong> {bike.kilometers}</p>
            <p><strong>Purchase Date:</strong> {bike.purchaseDate}</p>
            <p><strong>Age:</strong> {getAge(bike.purchaseDate)}</p>
            <p><strong>Color:</strong> {bike.color}</p>
            <p><strong>Reg Number:</strong> {bike.regNumber}</p>
            {bike.engineNumber && <p><strong>Engine No:</strong> {bike.engineNumber}</p>}
            {bike.chassisNumber && <p><strong>Chassis No:</strong> {bike.chassisNumber}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default BikeDetails;
