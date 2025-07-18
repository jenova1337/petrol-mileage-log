import React, { useEffect, useState } from "react";

const Summary = () => {
  const [petrolLog, setPetrolLog] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("petrolLog")) || [];
    setPetrolLog(stored);
  }, []);

  const total = petrolLog.reduce((acc, entry) => acc + Number(entry.amount), 0);

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 900,
        margin: "auto",
        background: "#f9f9f9",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>📈 Petrol Summary</h2>

      {petrolLog.length === 0 ? (
        <p style={{ textAlign: "center" }}>No petrol entries found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th style={cellStyle}>S.No</th>
              <th style={cellStyle}>Bike Name</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Rate ₹</th>
              <th style={cellStyle}>Amount ₹</th>
              <th style={cellStyle}>Litres</th>
              <th style={cellStyle}>KM Now</th>
            </tr>
          </thead>
          <tbody>
            {petrolLog.map((entry, index) => (
              <tr key={index}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{entry.bikeName}</td>
                <td style={cellStyle}>{entry.date}</td>
                <td style={cellStyle}>{entry.rate}</td>
                <td style={cellStyle}>{entry.amount}</td>
                <td style={cellStyle}>{entry.litres}</td>
                <td style={cellStyle}>{entry.km}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 20, textAlign: "right", fontWeight: "bold" }}>
        Total Spent: ₹ {total.toFixed(2)}
      </div>
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

export default Summary;
