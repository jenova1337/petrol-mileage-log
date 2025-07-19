import React, { useEffect, useState } from "react";

const Summary = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("petrolLogs") || "[]");
    setLogs(saved);
  }, []);

  const totalByBike = logs.reduce((acc, log) => {
    if (!acc[log.bike]) acc[log.bike] = 0;
    acc[log.bike] += Number(log.amount);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20 }}>
      <h2>📈 Summary</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Bike</th>
            <th>Total ₹</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(totalByBike).map(([bike, total], i) => (
            <tr key={i}>
              <td>{bike}</td>
              <td>₹{total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  },
};

export default Summary;
