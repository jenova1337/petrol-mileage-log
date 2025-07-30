import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PetrolPump = ({ user }) => {
  const { user: authUser } = useAuth();
  const currentUser = user || authUser;
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [km, setKm] = useState("");
  const [log, setLog] = useState([]);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchBikes();
      fetchLogs();
    }
  }, [currentUser]);

  const fetchBikes = async () => {
    const snap = await getDocs(collection(db, "users", currentUser.uid, "bikes"));
    const arr = [];
    snap.forEach((doc) => arr.push(doc.data()));
    setBikes(arr);
  };

  const fetchLogs = async () => {
    const snap = await getDocs(collection(db, "users", currentUser.uid, "petrolLogs"));
    const arr = [];
    snap.forEach((doc) => arr.push(doc.data()));
    setLog(arr);
  };

  const handleSave = async () => {
    if (!bike || !rate || !amount || !km) {
      alert("Please fill all fields");
      return;
    }

    const litresValue = parseFloat(amount) / parseFloat(rate);
    const entry = {
      date: new Date().toISOString(),
      bike,
      rate: parseFloat(rate),
      amount: parseFloat(amount),
      litres: parseFloat(litresValue.toFixed(2)),
      km: parseFloat(km),
    };

    await addDoc(collection(db, "users", currentUser.uid, "petrolLogs"), entry);
    setLog((prev) => [...prev, entry]);
    setBike("");
    setRate("");
    setAmount("");
    setKm("");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const filtered = log.filter((l) => l.bike === bike);
    doc.text(`Petrol Log - ${bike}`, 14, 10);
    const rows = filtered.map((entry, i) => [
      i + 1,
      entry.date,
      entry.bike,
      entry.rate,
      entry.amount,
      entry.litres,
      entry.km,
    ]);
    doc.autoTable({
      startY: 20,
      head: [["S.No", "Date", "Bike", "Rate ₹", "Amount ₹", "Litres", "KM"]],
      body: rows,
    });
    doc.save(`${bike}-PetrolLog.pdf`);
  };

  const totalAmount = log.reduce(
    (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    0
  );

  const filtered = log.filter((l) => l.bike === bike);

  return (
    <div style={{ padding: 20 }}>
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
      <input type="number" placeholder="Current KM" value={km} onChange={(e) => setKm(e.target.value)} />
      <br />
      <button onClick={handleSave} style={{ marginTop: 10 }}>Save</button>

      <h4 style={{ marginTop: 20 }}>📋 Petrol Logs</h4>
      {!bike ? (
        <p>Select a bike to see petrol logs.</p>
      ) : filtered.length === 0 ? (
        <p>No petrol logs for this bike.</p>
      ) : (
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
              {filtered.map((entry, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
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
          <p><strong>Total Petrol:</strong> ₹{totalAmount.toFixed(2)}</p>
          <button onClick={handleDownloadPDF}>📄 Download PDF</button>
        </>
      )}
    </div>
  );
};

export default PetrolPump;
