// src/components/BikeDetails.js
import React, { useEffect, useState } from "react";

const BikeDetails = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const storedBikes = JSON.parse(localStorage.getItem(`bikes_${user.mobile}`)) || [];
      setBikes(storedBikes);
    }
  }, []);

  const getAge = (purchaseDate) => {
    const purchase = new Date(purchaseDate);
    const today = new Date();
    const age = today.getFullYear() - purchase.getFullYear();
    return age;
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          backgroundColor: "#ccc",
          color: "#000",
          padding: "8px 16px",
          borderRadius: "6px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        🔙 Back to Dashboard
      </button>

      <h2>📋 Bike Details</h2>

      {bikes.length === 0 ? (
        <p>No bikes added yet.</p>
      ) : (
        bikes.map((bike, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "20px",
              backgroundColor: "#f1f1f1",
            }}
          >
            <p><strong>🚲 Name:</strong> {bike.name}</p>
            <p><strong>📅 Model & Year:</strong> {bike.model} ({bike.year})</p>
            <p><strong>📍 Kilometers Run:</strong> {bike.kilometers} km</p>
            <p><strong>🛒 Purchase Date:</strong> {bike.purchaseDate}</p>
            <p><strong>📆 Age:</strong> {getAge(bike.purchaseDate)} years</p>
            <p><strong>🎨 Color:</strong> {bike.color}</p>
            <p><strong>🔢 Reg Number:</strong> {bike.regNumber}</p>
            {bike.engineNumber && (
              <p><strong>🧩 Engine No:</strong> {bike.engineNumber}</p>
            )}
            {bike.chassisNumber && (
              <p><strong>🔧 Chassis No:</strong> {bike.chassisNumber}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BikeDetails;
