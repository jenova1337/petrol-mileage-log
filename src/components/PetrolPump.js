// src/components/PetrolPump.js
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PetrolPump = () => {
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
      alert("Please fill all fields");
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
    mileage.lastPetrol = { km: entry.km, litres: litres };
    localStorage.setItem("mileageConstants", JSON.stringify(mileage));

    setBike("");
    setRate("");
    setAmount("");
    setKm("");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Petrol Fill Log", 14, 16);
    const rows = log.map((entry, i) => [
      i + 1,
      entry.date,
      entry.bike,
      entry.rate,
      entry.amount,
      entry.litres,
      entry.km,
    ]);

    doc.autoTable({
      head: [["S.No", "Date", "Bike", "Rate ₹", "Amount ₹", "Litres", "KM"]],
      body: rows,
      startY: 20,
    });

    doc.save("Petrol_Log.pdf");
  };

  const totalAmount = log.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h3>⛽ Petrol Pump Log</h3>

      <select value={bike} onChange={(e) => setBike(e.target.value)}>
        <option value="">Select Bike</option>
        {bikes.map((b, i) => (
          <option key={i} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <br />

      <input type="number" placeholder="Petrol Rate ₹" value={rate} onChange={(e) => setRate(e.target.value)} />
      <br />
      <input type="number" placeholder="Amount ₹" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <input type="number" placeholder="Current KM in Meter" value={km} onChange={(e) => setKm(e.target.value)} />
      <br />

      <button onClick={handleSave} style={{ marginTop: 10 }}>
        Save
      </button>

      <h4 style={{ marginTop: 20 }}>📋 Petrol Fill Log</h4>
      {log.length > 0 ? (
        <>
          <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Bike</th>
                <th>Rate ₹</th>
                <th>Amount ₹</th>
                <th>Litres</th>
                <th>KM</th>
              </tr>
            </thead>
            <tbody>
              {log.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.date}</td>
                  <td>{entry.bike}</td>
                  <td>{entry.rate}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.litres}</td>
                  <td>{entry.km}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: 10 }}>
            <strong>💰 Total Petrol ₹:</strong> ₹{totalAmount.toFixed(2)}
          </p>

          <button onClick={downloadPDF} style={{ marginTop: 10 }}>
            📥 Download PDF
          </button>
        </>
      ) : (
        <p>📭 No petrol fill logs found.</p>
      )}
    </div>
  );
};

export default PetrolPump;
