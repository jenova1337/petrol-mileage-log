import React, { useEffect, useState } from "react";

const BikeDetails = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bikes")) || [];
    setBikes(saved);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📋 Bike Details</h2>
      {bikes.length === 0 ? (
        <p>No bikes added yet.</p>
      ) : (
        bikes.map((bike, index) => (
          <div key={index} style={styles.card}>
            <h3>{bike.name} ({bike.model})</h3>
            <p><strong>Year:</strong> {bike.year}</p>
            <p><strong>KMs:</strong> {bike.kms}</p>
            <p><strong>Purchase Date:</strong> {bike.purchaseDate}</p>
            <p><strong>Color:</strong> {bike.color}</p>
            <p><strong>Reg No:</strong> {bike.regNo}</p>
            {bike.engineNo && <p><strong>Engine No:</strong> {bike.engineNo}</p>}
            {bike.chassisNo && <p><strong>Chassis No:</strong> {bike.chassisNo}</p>}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9"
  }
};

export default BikeDetails;
