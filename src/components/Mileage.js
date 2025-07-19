// ✅ Mileage.js
import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const mileageLogs = JSON.parse(localStorage.getItem("mileageLogs")) || [];
    setLogs(mileageLogs);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>📊 Mileage Report</h3>
      {logs.length > 0 ? (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
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
