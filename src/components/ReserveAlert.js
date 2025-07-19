import React, { useState, useEffect } from "react";

const ReserveAlert = () => {
  const [reserveKm, setReserveKm] = useState("");
  const [alertTime, setAlertTime] = useState("6");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("reserveLogs")) || [];
    setLogs(savedLogs);
  }, []);

  const handleSave = () => {
    const newEntry = {
      date: new Date().toLocaleString(),
      km: reserveKm,
    };

    const updated = [...logs, newEntry];
    localStorage.setItem("reserveLogs", JSON.stringify(updated));
    localStorage.setItem("alertTime", alertTime);

    const mileage = JSON.parse(localStorage.getItem("mileageConstants")) || {};

    if (mileage.lastReserve && mileage.lastPetrol) {
      mileage.lastReserveAfter = newEntry;
      const before = mileage.lastReserve;
      const petrol = mileage.lastPetrol;
      const after = newEntry;
      const distance = parseFloat(after.km) - parseFloat(before.km);
      const mileageValue =
        petrol.litres > 0 && distance > 0
          ? (distance / petrol.litres).toFixed(2)
          : "N/A";

      const newLog = {
        beforeReserveKm: before.km,
        petrolLitres: petrol.litres,
        afterReserveKm: after.km,
        mileage: mileageValue,
        date: new Date().toLocaleString(),
      };

      const logs = JSON.parse(localStorage.getItem("mileageLogs")) || [];
      localStorage.setItem("mileageLogs", JSON.stringify([...logs, newLog]));
    }

    mileage.lastReserve = newEntry;
    delete mileage.lastPetrol;
    delete mileage.lastReserveAfter;

    localStorage.setItem("mileageConstants", JSON.stringify(mileage));
    setLogs(updated);
    alert("✅ Reserve alert saved!");
    setReserveKm("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>🔔 Reserve Details & Alert</h3>

      <input
        type="number"
        placeholder="Reserve Kilometers"
        value={reserveKm}
        onChange={(e) => setReserveKm(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <br />

      <label>Alert me after: </label>
      <select
        value={alertTime}
        onChange={(e) => setAlertTime(e.target.value)}
        style={{ marginBottom: 10 }}
      >
        <option value="6">6 hrs</option>
        <option value="12">12 hrs</option>
        <option value="24">24 hrs</option>
      </select>

      <br />

      <button style={{ marginTop: 10 }} onClick={handleSave}>
        Save Reserve Alert
      </button>

      <h4 style={{ marginTop: 20 }}>📋 Reserve Log</h4>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Reserve KM</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{log.date}</td>
              <td>{log.km}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReserveAlert;
