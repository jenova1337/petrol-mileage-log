// src/components/ReserveAlert.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReserveAlert = () => {
  const navigate = useNavigate();
  const [reserveKm, setReserveKm] = useState("");
  const [alertTime, setAlertTime] = useState("6");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    setLogs(savedLogs);
  }, []);

  const handleSave = () => {
    const newEntry = {
      date: new Date().toLocaleString(),
      km: reserveKm,
    };

    const updated = [...logs, newEntry];
    localStorage.setItem("reserveLogs", JSON.stringify(updated));
    localStorage.setItem("alertTime", alertTime);

    const mileage = JSON.parse(localStorage.getItem("mileageConstants")) || {};

    if (mileage.lastReserve && mileage.lastPetrol) {
      mileage.lastReserveAfter = newEntry;

      const before = mileage.lastReserve;
      const petrol = mileage.lastPetrol;
      const after = newEntry;
      const distance = parseFloat(after.km) - parseFloat(before.km);
      const mileageValue =
        petrol.litres > 0 && distance > 0
          ? (distance / petrol.litres).toFixed(2)
          : "N/A";

      const newLog = {
        beforeReserveKm: before.km,
        petrolLitres: petrol.litres,
        afterReserveKm: after.km,
        mileage: mileageValue,
        date: new Date().toLocaleString(),
      };

      const logs = JSON.parse(localStorage.getItem("mileageLogs")) || [];
      localStorage.setItem("mileageLogs", JSON.stringify([...logs, newLog]));
    }

    mileage.lastReserve = newEntry;
    delete mileage.lastPetrol;
    delete mileage.lastReserveAfter;

    localStorage.setItem("mileageConstants", JSON.stringify(mileage));
    setLogs(updated);
    alert("✅ Reserve alert saved!");
    setReserveKm("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#ddd",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🔙 Back to Dashboard
      </button>

      <h2 style={{ marginBottom: "20px" }}>🔔 Reserve Details & Alert</h2>

      <input
        type="number"
        placeholder="Enter Reserve Kilometers"
        value={reserveKm}
        onChange={(e) => setReserveKm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "15px",
          width: "250px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      <br />

      <label style={{ marginRight: "10px" }}>Alert me after: </label>
      <select
        value={alertTime}
        onChange={(e) => setAlertTime(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="6">6 hrs</option>
        <option value="12">12 hrs</option>
        <option value="24">24 hrs</option>
      </select>
      <br />

      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        💾 Save Reserve Alert
      </button>

      <h3 style={{ marginTop: "30px" }}>📋 Reserve Log</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Reserve KM</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>
                No entries yet
              </td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{log.date}</td>
                <td style={tdStyle}>{log.km}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Table styles
const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left",
  backgroundColor: "#e9e9e9",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left",
};

export default ReserveAlert;
