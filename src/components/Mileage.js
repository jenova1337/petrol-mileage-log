// ✅ Mileage.js
// src/components/Mileage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Mileage = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const mileageLogs = JSON.parse(localStorage.getItem("mileageLogs")) || [];
    setLogs(mileageLogs);
  }, []);

  return (
    <div style={{ padding: 20 }}>
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

      <h3>📊 Mileage Report</h3>

      {logs.length > 0 ? (
        <table
          border="1"
          cellPadding="6"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th>S.No</th>
              <th>Before Petrol Reserved KM</th>
              <th>Petrol Poured (Litres)</th>
              <th>After Petrol Reserved KM</th>
              <th>Mileage (km/l)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{log.beforeReserveKm}</td>
                <td>{log.petrolLitres}</td>
                <td>{log.afterReserveKm}</td>
                <td>{log.mileage}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>📭 No valid Reserve → Petrol → Reserve sequence yet.</p>
      )}
    </div>
  );
};

export default Mileage;
