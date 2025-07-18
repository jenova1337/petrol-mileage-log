import React, { useState, useEffect } from "react";

const ReserveAlert = () => {
  const [reserveKm, setReserveKm] = useState("");
  const [alertHours, setAlertHours] = useState("6");
  const [lastSet, setLastSet] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reserveSettings"));
    if (saved) {
      setReserveKm(saved.reserveKm);
      setAlertHours(saved.alertHours);
      setLastSet(saved.timestamp);
    }
  }, []);

  const handleSave = () => {
    const reserveSettings = {
      reserveKm,
      alertHours,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("reserveSettings", JSON.stringify(reserveSettings));
    setLastSet(reserveSettings.timestamp);
    alert("Reserve Alert settings saved!");
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ⛽ Set Reserve Alert
      </h2>

      <div style={{ marginBottom: "16px" }}>
        <label>Reserve Kilometers:</label>
        <input
          type="number"
          value={reserveKm}
          onChange={(e) => setReserveKm(e.target.value)}
          placeholder="Enter reserve km"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>Alert Reminder Time:</label>
        <select
          value={alertHours}
          onChange={(e) => setAlertHours(e.target.value)}
          style={inputStyle}
        >
          <option value="6">6 hours</option>
          <option value="12">12 hours</option>
          <option value="24">24 hours</option>
        </select>
      </div>

      <button onClick={handleSave} style={buttonStyle}>
        💾 Save Reserve Settings
      </button>

      {lastSet && (
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#555" }}>
          Last set: {new Date(lastSet).toLocaleString()}
        </p>
      )}
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "4px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

export default ReserveAlert;
