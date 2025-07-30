import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PetrolPump = ({ user }) => {
  const [bikeId, setBikeId] = useState("");
  const [bikes, setBikes] = useState([]);
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [km, setKm] = useState("");
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (user) fetchBikes();
  }, [user]);

  const fetchBikes = async () => {
    const snap = await getDocs(collection(db, "users", user.uid, "bikes"));
    const arr = [];
    snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
    setBikes(arr);
  };

  const fetchLogs = async (bikeId) => {
    const snap = await getDocs(
      collection(db, "users", user.uid, "bikes", bikeId, "petrolLogs")
    );
    const arr = [];
    snap.forEach((doc) => arr.push(doc.data()));
    setLog(arr);
  };

  const handleSave = async () => {
    if (!bikeId || !rate || !amount || !km) {
      alert("Select bike & fill all fields");
      return;
    }

    const litresValue = parseFloat(amount) / parseFloat(rate);
    const entry = {
      date: new Date().toISOString(),
      rate: parseFloat(rate),
      amount: parseFloat(amount),
      litres: parseFloat(litresValue.toFixed(2)),
      km: parseFloat(km),
    };

    await addDoc(
      collection(db, "users", user.uid, "bikes", bikeId, "petrolLogs"),
      entry
    );

    fetchLogs(bikeId);
    setRate("");
    setAmount("");
    setKm("");
  };

  const total = log.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Petrol Log", 14, 10);

    const rows = log.map((e, i) => [
      i + 1,
      e.date,
      e.rate,
      e.amount,
      e.litres,
      e.km,
    ]);

    doc.autoTable({
      startY: 20,
      head: [["S.No", "Date", "Rate", "Amount", "Litres", "KM"]],
      body: rows,
      theme: "grid",
    });

    doc.save("PetrolLog.pdf");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>⛽ Petrol Pump</h3>

      <select
        value={bikeId}
        onChange={(e) => {
          setBikeId(e.target.value);
          fetchLogs(e.target.value);
        }}
        style={{ marginBottom: 10 }}
      >
        <option value="">Select Bike</option>
        {bikes.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      <br />

      <input
        type="number"
        placeholder="Rate ₹"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <br />
      <input
        type="number"
        placeholder="Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <br />
      <input
        type="number"
        placeholder="KM"
        value={km}
        onChange={(e) => setKm(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <br />

      <button onClick={handleSave} style={{ marginBottom: 20 }}>
        Save
      </button>

      <h4>Logs</h4>
      {log.length === 0 ? (
        <p>No logs.</p>
      ) : (
        <>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Litres</th>
                <th>KM</th>
              </tr>
            </thead>
            <tbody>
              {log.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.date}</td>
                  <td>{e.rate}</td>
                  <td>{e.amount}</td>
                  <td>{e.litres}</td>
                  <td>{e.km}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: ₹{total.toFixed(2)}</p>
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </>
      )}
    </div>
  );
};

export default PetrolPump;
