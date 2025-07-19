import React from "react";

const Instructions = () => {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h2>📘 Instructions</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li>➡️ Start by adding your bikes in the Add Bike tab.</li>
        <li>🔔 When bike hits reserve, record KM in Reserve Alert tab.</li>
        <li>⛽ When filling petrol, enter details in Petrol Pump tab.</li>
        <li>📊 Mileage is calculated between two reserves using one petrol entry.</li>
        <li>📈 Summary tab shows total petrol amount per bike.</li>
        <li>📘 Use this tab for help at any time.</li>
      </ul>
    </div>
  );
};

export default Instructions;
