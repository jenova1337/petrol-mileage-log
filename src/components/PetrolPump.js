// src/components/PetrolPump.js
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const PetrolPump = () => {
  const navigate = useNavigate();
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [km, setKm] = useState("");
  const [log, setLog] = useState([]);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("petrolLogs")) || [];
    setLog(saved);
    const bikeList = JSON.parse(localStorage.getItem("bikes")) || [];
    setBikes(bikeList);
  }, []);

  const handleSave = () => {
    if (!bike || !rate || !amount || !km) {
      alert("❗ Please fill all fields");
      return;
    }

    const litres = (parseFloat(amount) / parseFloat(rate)).toFixed(2);
    const entry = {
      date: new Date().toLocaleString(),
      bike,
      rate,
      amount,
      litres,
      km,
    };

    const updatedLog = [...log, entry];
    localStorage.setItem("petrolLogs", JSON.stringify(updatedLog));
    setLog(updatedLog);

    const mileage = JSON.parse(localStorage.getItem("mileageConstants")) || {};
    mileage.lastPetrol = {
      km: entry.km,
      litres: litres,
    };
    localStorage.setItem("mileageConstants", JSON.stringify(mileage));

    setBike("");
    setRate("");
    setAmount("");
    setKm("");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Petrol Fill Log", 14, 10);
    const tableColumn = ["S.No", "Date", "Bike", "Rate ₹", "Amount ₹", "Litres", "KM"];
    const tableRows = log.map((entry, index) => [
      index + 1,
      entry.date,
      entry.bike,
      entry.rate,
      entry.amount,
      entry.litres,
      entry.km,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("petrol_log.pdf");
  };

  const totalAmount = log.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

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

      <h3>⛽ Petrol Pump Log</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <select value={bike} onChange={(e) => setBike(e.target.value)}>
          <option value="">Select Bike</option>
          {bikes.map((b, i) => (
            <option key={i} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Petrol Rate ₹"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Current KM in Meter"
          value={km}
          onChange={(e) => setKm(e.target.value)}
        />

        <button onClick={handleSave}>💾 Save</button>
      </div>

      <h4 style={{ marginTop: 30 }}>📋 Petrol Fill Log</h4>

      {log.length > 0 ? (
        <>
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                border: "1px solid #ccc",
              }}
            >
              <thead style={{ backgroundColor: "#f0f0f0" }}>
                <tr>
                  <th style={cellStyle}>S.No</th>
                  <th style={cellStyle}>Date</th>
                  <th style={cellStyle}>Bike</th>
                  <th style={cellStyle}>Rate ₹</th>
                  <th style={cellStyle}>Amount ₹</th>
                  <th style={cellStyle}>Litres</th>
                  <th style={cellStyle}>KM</th>
                </tr>
              </thead>
              <tbody>
                {log.map((entry, index) => (
                  <tr key={index}>
                    <td style={cellStyle}>{index + 1}</td>
                    <td style={cellStyle}>{entry.date}</td>
                    <td style={cellStyle}>{entry.bike}</td>
                    <td style={cellStyle}>{entry.rate}</td>
                    <td style={cellStyle}>{entry.amount}</td>
                    <td style={cellStyle}>{entry.litres}</td>
                    <td style={cellStyle}>{entry.km}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: 10 }}>
            <strong>💰 Total Petrol ₹:</strong> ₹{totalAmount.toFixed(2)}
          </p>

          <button onClick={handleDownloadPDF} style={{ marginTop: 10 }}>
            ⬇️ Download PDF
          </button>
        </>
      ) : (
        <p>📭 No petrol fill logs found.</p>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "6px",
  textAlign: "left",
};

export default PetrolPump;
