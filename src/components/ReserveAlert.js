import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ReserveAlert = ({ user }) => {
  const [reserveKM, setReserveKM] = useState("");
  const [bike, setBike] = useState("");
  const [bikes, setBikes] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (user) {
      fetchBikes();
      fetchReserves();
    }
  }, [user]);

  const fetchBikes = async () => {
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "bikes"));
    const bikeArr = [];
    querySnapshot.forEach((doc) => bikeArr.push(doc.data()));
    setBikes(bikeArr);
  };

  const fetchReserves = async () => {
    const snapshot = await getDocs(collection(db, "users", user.uid, "reserves"));
    const items = [];
    snapshot.forEach((doc) => items.push(doc.data()));
    setLogs(items);
  };

  const handleSave = async () => {
    if (!bike || !reserveKM) {
      alert("Please select a bike and enter KM");
      return;
    }

    const entry = {
      bike,
      km: reserveKM,
      date: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "users", user.uid, "reserves"), entry);
      setLogs((prev) => [...prev, entry]);
      setReserveKM("");
      setBike("");
    } catch (err) {
      console.error("Error saving reserve:", err);
    }
  };

  const inputStyle = { marginBottom: "10px", display: "block", padding: "6px", width: "100%" };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff8e1",
        border: "2px solid #ffcc80",
        borderRadius: "10px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h3>🔔 Reserve Alert</h3>

      <select
        value={bike}
        onChange={(e) => setBike(e.target.value)}
        style={inputStyle}
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
        placeholder="Enter Reserve KM"
        value={reserveKM}
        onChange={(e) => setReserveKM(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleSave}>Save</button>

      <h4 style={{ marginTop: 20 }}>📋 Reserve Entries</h4>
      {logs.length > 0 ? (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Bike</th>
              <th>KM</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.date}</td>
                <td>{entry.bike}</td>
                <td>{entry.km}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>📭 No reserve logs yet.</p>
      )}
    </div>
  );
};

export default ReserveAlert;
