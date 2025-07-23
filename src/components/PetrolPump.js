import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PetrolPump = ({ user }) => {
  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [km, setKm] = useState("");
  const [log, setLog] = useState([]);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    if (user) {
      fetchBikes();
      fetchLogs();
    }
  }, [user]);

  const fetchBikes = async () => {
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "bikes"));
    const bikeArr = [];
    querySnapshot.forEach((doc) => bikeArr.push(doc.data()));
    setBikes(bikeArr);
  };

  const fetchLogs = async () => {
    const snapshot = await getDocs(collection(db, "users", user.uid, "petrolLogs"));
    const logs = [];
    snapshot.forEach((doc) => logs.push(doc.data()));
    setLog(logs);
  };

  const handleSave = async () => {
    if (!bike || !rate || !amount || !km) {
      alert("Please fill all fields");
      return;
    }

    const litres = (parseFloat(amount) / parseFloat(rate)).toFixed(2);
    const entry = {
      date: Timestamp.now().toDate().toLocaleString(),
      bike,
      rate,
      amount,
      litres,
      km,
    };

    try {
      await addDoc(collection(db, "users", user.uid, "petrolLogs"), entry);
      setLog((prev) => [...prev, entry]);
      setBike("");
      setRate("");
      setAmount("");
      setKm("");
    } catch (err) {
      console.error("Error saving petrol log:", err);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("⛽ Petrol Pump Log", 14, 10);

    const tableData = log.map((entry, index) => [
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
      body: tableData,
      theme: "grid",
    });

    doc.save("PetrolPumpLog.pdf");
  };

  const totalAmount = log.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h3>⛽ Petrol Pump Log</h3>

      <select
        value={bike}
        onChange={(e) => setBike(e.target.value)}
        style={{ padding: "6px", marginBottom: "10px", width: "100%" }}
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
        style={{ padding: "6px", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="number"
        placeholder="Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "6px", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="number"
        placeholder="Current KM"
        value={km}
        onChange={(e) => setKm(e.target.value)}
        style={{ padding: "6px", marginBottom: "10px", width: "100%" }}
      />

      <button onClick={handleSave}>Save</button>

      <h4 style={{ marginTop: 20 }}>📋 Petrol Fill Log</h4>
      {log.length > 0 ? (
        <>
          <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
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
          <p style={{ marginTop: "10px" }}>
            <strong>💰 Total Petrol ₹:</strong> ₹{totalAmount.toFixed(2)}
          </p>

          <button onClick={downloadPDF} style={{ marginTop: "10px" }}>
            📄 Download PDF
          </button>
        </>
      ) : (
        <p>📭 No petrol fill logs found.</p>
      )}
    </div>
  );
};

export default PetrolPump;
