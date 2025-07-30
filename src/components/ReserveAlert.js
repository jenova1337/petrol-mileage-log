import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ReserveAlert = ({ user }) => {
  const [reserveKM, setReserveKM] = useState("");
  const [bike, setBike] = useState("");
  const [bikes, setBikes] = useState([]);
  const [logs, setLogs] = useState([]);

  // For log viewing
  const [selectedBikeForLogs, setSelectedBikeForLogs] = useState("");

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
    if (!bike || !reserveKM) return alert("Please select bike and enter KM");

    const entry = {
      bike,
      km: reserveKM,
      date: new Date().toLocaleString(),
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

  // Filter logs by selected bike
  const filteredLogs = logs.filter((log) => log.bike === selectedBikeForLogs);

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h3>🔔 Reserve Alert</h3>

      {/* Form Section */}
      <select
        value={bike}
        onChange={(e) => setBike(e.target.value)}
        style={{ marginBottom: "10px", display: "block", padding: "6px", width: "100%" }}
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
        placeholder="Enter Reserve KM"
        value={reserveKM}
        onChange={(e) => setReserveKM(e.target.value)}
        style={{ marginBottom: "10px", display: "block", padding: "6px", width: "100%" }}
      />

      <button onClick={handleSave}>Save</button>

      {/* Logs Section */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "2px solid #ffcc80",
          borderRadius: "10px",
          backgroundColor: "#fff8e1",
        }}
      >
        <h4>📋 Reserve Logs</h4>

        <select
          value={selectedBikeForLogs}
          onChange={(e) => setSelectedBikeForLogs(e.target.value)}
          style={{ marginBottom: "10px", display: "block", padding: "6px", width: "100%" }}
        >
          <option value="">Select Bike to View Logs</option>
          {bikes.map((b, i) => (
            <option key={i} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        {selectedBikeForLogs === "" ? (
          <p>ℹ️ Select a bike to view logs.</p>
        ) : filteredLogs.length === 0 ? (
          <p>📭 No reserve logs yet for this bike.</p>
        ) : (
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
              {filteredLogs.map((entry, idx) => (
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
    </div>
  );
};

export default ReserveAlert;
