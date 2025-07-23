import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";

const ReserveAlert = () => {
  const { user } = useAuth();
  const [reserveKM, setReserveKM] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (user) fetchReserves();
  }, [user]);

  const fetchReserves = async () => {
    const snapshot = await getDocs(collection(db, "users", user.uid, "reserves"));
    const items = [];
    snapshot.forEach((doc) => items.push(doc.data()));
    setLogs(items);
  };

  const handleSave = async () => {
    if (!reserveKM) return alert("Please enter KM");

    const entry = {
      km: reserveKM,
      date: new Date().toLocaleString(),
    };

    try {
      await addDoc(collection(db, "users", user.uid, "reserves"), entry);
      setLogs((prev) => [...prev, entry]);
      setReserveKM("");
    } catch (err) {
      console.error("Error saving reserve:", err);
    }
  };

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
      <button onClick={() => window.location.reload()} style={{ marginBottom: "10px" }}>
        🔙 Back to Dashboard
      </button>
      <h3>🔔 Reserve Alert</h3>
      <input
        type="number"
        placeholder="Enter Reserve KM"
        value={reserveKM}
        onChange={(e) => setReserveKM(e.target.value)}
        style={{ marginBottom: "10px", display: "block", padding: "6px" }}
      />
      <button onClick={handleSave}>Save</button>

      <h4 style={{ marginTop: 20 }}>📋 Reserve Entries</h4>
      {logs.length > 0 ? (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
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
      ) : (
        <p>📭 No reserve logs yet.</p>
      )}
    </div>
  );
};

export default ReserveAlert;
