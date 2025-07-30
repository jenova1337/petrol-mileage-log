import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PetrolPump = ({ user }) => {
  // Safe user selection
  const { user: authUser } = useAuth();
  const currentUser = user || authUser;

  const [bike, setBike] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [km, setKm] = useState("");
  const [log, setLog] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [selectedBikeForLogs, setSelectedBikeForLogs] = useState("");

  useEffect(() => {
    if (currentUser) {
      fetchBikes();
      fetchLogs();
    }
  }, [currentUser]);

  const fetchBikes = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", currentUser.uid, "bikes")
      );
      const bikeArr = [];
      querySnapshot.forEach((doc) => bikeArr.push(doc.data()));
      setBikes(bikeArr);
    } catch (err) {
      console.error("Error fetching bikes:", err);
    }
  };

  const fetchLogs = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "users", currentUser.uid, "petrolLogs")
      );
      const logs = [];
      snapshot.forEach((doc) => logs.push(doc.data()));
      setLog(logs);
    } catch (err) {
      console.error("Error fetching petrol logs:", err);
    }
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
      await addDoc(collection(db, "users", currentUser.uid, "petrolLogs"), entry);
      setLog((prev) => [...prev, entry]);
      setBike("");
      setRate("");
      setAmount("");
      setKm("");
    } catch (err) {
      console.error("Error saving petrol log:", err);
    }
  };

  // Filter logs by selected bike for viewing
  const filteredLogs = log.filter((entry) => entry.bike === selectedBikeForLogs);

  // Download filtered logs as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Petrol Fill Log", 14, 10);

    const rows = filteredLogs.map((entry, index) => [
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

  const totalAmount = filteredLogs.reduce(
    (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    0
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h3>⛽ Petrol Pump Log</h3>

      {/* Input Section */}
      <select
        value={bike}
        onChange={(e) => setBike(e.target.value)}
        style={{
          display: "block",
          padding: "6px",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <option value="">Select Bike (to Add)</option>
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
          display: "block",
          padding: "6px",
          width: "100%",
        }}
      />
      <input
        type="number"
        placeholder="Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          marginBottom: "10px",
          display: "block",
          padding: "6px",
          width: "100%",
        }}
      />
      <input
        type="number"
        placeholder="Current KM"
        value={km}
        onChange={(e) => setKm(e.target.value)}
        style={{
          marginBottom: "10px",
          display: "block",
          padding: "6px",
          width: "100%",
        }}
      />

      <button onClick={handleSave}>Save</button>

      {/* Logs Section */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "2px solid #81d4fa",
          borderRadius: "10px",
          backgroundColor: "#e1f5fe",
        }}
      >
        <h4>📋 Petrol Logs</h4>

        <select
          value={selectedBikeForLogs}
          onChange={(e) => setSelectedBikeForLogs(e.target.value)}
          style={{
            marginBottom: "10px",
            display: "block",
            padding: "6px",
            width: "100%",
          }}
        >
          <option value="">Select Bike to View Logs</option>
          {bikes.map((b, i) => (
            <option key={i} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        {selectedBikeForLogs === "" ? (
          <p>ℹ️ Select a bike to view petrol logs.</p>
        ) : filteredLogs.length === 0 ? (
          <p>📭 No petrol logs found for this bike.</p>
        ) : (
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
                {filteredLogs.map((entry, index) => (
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
            <button onClick={handleDownloadPDF}>📄 Download PDF</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PetrolPump;
