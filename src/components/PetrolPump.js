import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import useAuth from "../auth/useAuth";
import { db } from "../firebase";
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
    const querySnapshot = await getDocs(
      collection(db, "users", currentUser.uid, "bikes")
    );
    const bikeArr = [];
    querySnapshot.forEach((doc) => bikeArr.push(doc.data()));
    setBikes(bikeArr);
  };

  const fetchLogs = async () => {
    const snapshot = await getDocs(
      collection(db, "users", currentUser.uid, "petrolLogs")
    );
    const logs = [];
    snapshot.forEach((doc) => logs.push(doc.data()));
    setLog(logs);
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

    try {
      await addDoc(
        collection(db, "users", currentUser.uid, "petrolLogs"),
        entry
      );
      setLog((prev) => [...prev, entry]);
      setBike("");
      setRate("");
      setAmount("");
      setKm("");
    } catch (err) {
      console.error("Error saving petrol log:", err);
    }
  };

  const totalAmount = log.reduce(
    (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    0
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Petrol Fill Log", 14, 10);

    const rows = log.map((entry, index) => [
      index + 1,
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
      theme: "grid",
    });

    doc.save("PetrolLog.pdf");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f1f8e9",
        border: "2px solid #81c784",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h3>⛽ Petrol Pump Log</h3>

      <select
        value={bike}
        onChange={(e) => setBike(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "6px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
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
        style={{
          marginBottom: "10px",
          padding: "6px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      <input
        type="number"
        placeholder="Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "6px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      <input
        type="number"
        placeholder="Current KM"
        value={km}
        onChange={(e) => setKm(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "6px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <button onClick={handleSave} style={{ marginBottom: "15px" }}>
        Save
      </button>

      <h4>📋 Petrol Logs</h4>
      {log.length > 0 ? (
        <>
          <table
            border="1"
            cellPadding="6"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
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
          <p>
            <strong>💰 Total Petrol ₹:</strong> ₹{totalAmount.toFixed(2)}
          </p>
          <button onClick={handleDownloadPDF} style={{ marginTop: 10 }}>
            📄 Download PDF
          </button>
        </>
      ) : (
        <p style={{ margin: 0 }}>
          Select a bike and save entries to view petrol logs.
        </p>
      )}
    </div>
  );
};

export default PetrolPump;
