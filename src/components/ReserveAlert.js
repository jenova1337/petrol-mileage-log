import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const formatDateToIST = (isoString) => {
  if (!isoString) return "-";
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ReserveAlert = ({ user }) => {
  const [reserveKM, setReserveKM] = useState("");
  const [bike, setBike] = useState("");
  const [bikes, setBikes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");

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
      alert("Please select bike and enter KM");
      return;
    }

    const entry = {
      bike,
      km: reserveKM,
      date: new Date().toISOString(),
    };

    await addDoc(collection(db, "users", user.uid, "reserves"), entry);
    setLogs((prev) => [...prev, entry]);
    setReserveKM("");
    setBike("");
  };

  const filteredLogs = selectedBike
    ? logs.filter((l) => l.bike === selectedBike)
    : [];

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h3>🔔 Reserve Alert</h3>

      <div
        style={{
          padding: 15,
          border: "2px solid #ffcc80",
          borderRadius: 10,
          backgroundColor: "#fff8e1",
          marginBottom: 20,
        }}
      >
        <select
          value={bike}
          onChange={(e) => setBike(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 10,
            borderRadius: 6,
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
          placeholder="Enter Reserve KM"
          value={reserveKM}
          onChange={(e) => setReserveKM(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 10,
            borderRadius: 6,
          }}
        />

        <button onClick={handleSave}>Save</button>
      </div>

      <div
        style={{
          padding: 15,
          border: "2px solid #ffcc80",
          borderRadius: 10,
          backgroundColor: "#fff8e1",
        }}
      >
        <select
          value={selectedBike}
          onChange={(e) => setSelectedBike(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <option value="">Select Bike to view logs</option>
          {bikes.map((b, i) => (
            <option key={i} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        {selectedBike === "" ? (
          <p>ℹ️ Select a bike to view reserve logs.</p>
        ) : filteredLogs.length === 0 ? (
          <p>📭 No reserve logs for this bike.</p>
        ) : (
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
                <th>KM</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((entry, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{formatDateToIST(entry.date)}</td>
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
