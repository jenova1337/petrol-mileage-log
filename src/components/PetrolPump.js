import React, { useState, useEffect } from "react";

const PetrolPump = () => {
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const [log, setLog] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("petrolLog"));
    if (saved) setLog(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const litres = (parseFloat(amount) / parseFloat(rate)).toFixed(2);
    const newEntry = {
      date: new Date().toLocaleString(),
      bike,
      rate,
      amount,
      litres,
      currentKm,
    };
    const updatedLog = [newEntry, ...log];
    setLog(updatedLog);
    localStorage.setItem("petrolLog", JSON.stringify(updatedLog));

    setBike("");
    setRate("");
    setAmount("");
    setCurrentKm("");
  };

  const totalAmount = log.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 700,
        margin: "auto",
        background: "#f9f9f9",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>⛽ Petrol Log</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          value={bike}
          onChange={(e) => setBike(e.target.value)}
          placeholder="Bike Name"
          required
          style={inputStyle}
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Petrol Rate ₹"
          required
          style={inputStyle}
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount Paid ₹"
          required
          style={inputStyle}
        />
        <input
          type="number"
          value={currentKm}
          onChange={(e) => setCurrentKm(e.target.value)}
          placeholder="Current KM"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>💾 Save Entry</button>
      </form>

      {log.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h3>🧾 Petrol Fill History</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
            <thead>
              <tr style={{ background: "#eee" }}>
                <th style={thTdStyle}>Date</th>
                <th style={thTdStyle}>Bike</th>
                <th style={thTdStyle}>Rate ₹</th>
                <th style={thTdStyle}>Amount ₹</th>
                <th style={thTdStyle}>Litres</th>
                <th style={thTdStyle}>Current KM</th>
              </tr>
            </thead>
            <tbody>
              {log.map((entry, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{entry.date}</td>
                  <td style={thTdStyle}>{entry.bike}</td>
                  <td style={thTdStyle}>{entry.rate}</td>
                  <td style={thTdStyle}>{entry.amount}</td>
                  <td style={thTdStyle}>{entry.litres}</td>
                  <td style={thTdStyle}>{entry.currentKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "right", marginTop: 10, fontWeight: "bold" }}>
            Total Amount: ₹{totalAmount}
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "100%",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const thTdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default PetrolPump;
