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
    const snap = await getDocs(collection(db, "users", user.uid, "bikes"));
    const arr = [];
    snap.forEach((doc) => arr.push(doc.data()));
    setBikes(arr);
  };

  const fetchReserves = async () => {
    const snap = await getDocs(collection(db, "users", user.uid, "reserves"));
    const arr = [];
    snap.forEach((doc) => arr.push(doc.data()));
    setLogs(arr);
  };

  const handleSave = async () => {
    if (!bike || !reserveKM) return alert("Please select bike and enter KM");
    const entry = { bike, km: reserveKM, date: new Date().toISOString() };
    await addDoc(collection(db, "users", user.uid, "reserves"), entry);
    setLogs((prev) => [...prev, entry]);
    setReserveKM("");
    setBike("");
  };

  const filtered = logs.filter((l) => l.bike === bike);

  return (
    <div style={{ padding: 20 }}>
      <h3>🔔 Reserve Alert</h3>

      <select value={bike} onChange={(e) => setBike(e.target.value)}>
        <option value="">Select Bike</option>
        {bikes.map((b, i) => (
          <option key={i} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <br />

      <input
        type="number"
        placeholder="Enter Reserve KM"
        value={reserveKM}
        onChange={(e) => setReserveKM(e.target.value)}
      />
      <br />
      <button onClick={handleSave}>Save</button>

      <h4 style={{ marginTop: 20 }}>📋 Reserve Logs</h4>
      {!bike ? (
        <p>Select a bike to see reserve logs.</p>
      ) : filtered.length === 0 ? (
        <p>No reserve logs for this bike.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Bike</th>
              <th>KM</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.date}</td>
                <td>{entry.bike}</td>
                <td>{entry.km}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReserveAlert;
