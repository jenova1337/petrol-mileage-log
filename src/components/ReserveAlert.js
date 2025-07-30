import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ReserveAlert = ({ user }) => {
  const [reserveKM, setReserveKM] = useState("");
  const [bikeId, setBikeId] = useState("");
  const [bikes, setBikes] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (user) fetchBikes();
  }, [user]);

  const fetchBikes = async () => {
    const snap = await getDocs(collection(db, "users", user.uid, "bikes"));
    const arr = [];
    snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
    setBikes(arr);
  };

  const fetchReserves = async (bikeId) => {
    const snap = await getDocs(
      collection(db, "users", user.uid, "bikes", bikeId, "reserves")
    );
    const arr = [];
    snap.forEach((doc) => arr.push(doc.data()));
    setLogs(arr);
  };

  const handleSave = async () => {
    if (!bikeId || !reserveKM) {
      alert("Please select a bike and enter KM");
      return;
    }

    const entry = {
      km: reserveKM,
      date: new Date().toISOString(),
    };

    await addDoc(
      collection(db, "users", user.uid, "bikes", bikeId, "reserves"),
      entry
    );
    setReserveKM("");
    fetchReserves(bikeId);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>🔔 Reserve Alert</h3>

      <select
        value={bikeId}
        onChange={(e) => {
          setBikeId(e.target.value);
          fetchReserves(e.target.value);
        }}
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
        placeholder="Enter Reserve KM"
        value={reserveKM}
        onChange={(e) => setReserveKM(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      <br />

      <button style={{ marginTop: 10 }} onClick={handleSave}>
        Save
      </button>

      <h4 style={{ marginTop: 20 }}>📋 Reserve Logs</h4>
      {logs.length === 0 ? (
        <p>No reserve logs.</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>KM</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.date}</td>
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
