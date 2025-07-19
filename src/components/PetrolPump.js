import React, { useState, useEffect } from "react";

const PetrolPump = () => {
  const [entry, setEntry] = useState({
    bike: "",
    rate: "",
    amount: "",
    kms: ""
  });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("petrolLogs")) || [];
    setLogs(stored);
  }, []);

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const litres = (Number(entry.amount) / Number(entry.rate)).toFixed(2);
    const newLog = { ...entry, litres, date: new Date().toLocaleString() };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem("petrolLogs", JSON.stringify(updatedLogs));
    setEntry({ bike: "", rate: "", amount: "", kms: "" });
    alert("🛢️ Petrol log saved!");
  };

  const getTotalAmount = () => logs.reduce((sum, l) => sum + Number(l.amount), 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>⛽ Petrol Pump</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="bike" placeholder="Bike Name" value={entry.bike} onChange={handleChange} required />
        <input name="rate" type="number" placeholder="Rate ₹" value={entry.rate} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount ₹" value={entry.amount} onChange={handleChange} required />
        <input name="kms" type="number" placeholder="Current KM" value={entry.kms} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>

      <h3 style={{ marginTop: 20 }}>📜 Petrol Log</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Bike</th>
            <th>₹ Rate</th>
            <th>₹ Amount</th>
            <th>Litres</th>
            <th>KM</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.bike}</td>
              <td>{log.rate}</td>
              <td>{log.amount}</td>
              <td>{log.litres}</td>
              <td>{log.kms}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p><strong>Total ₹:</strong> {getTotalAmount()}</p>
    </div>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 500, margin: "auto" },
  table: { width: "100%", marginTop: 10, borderCollapse: "collapse" },
};

export default PetrolPump;
