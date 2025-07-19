import React, { useState } from "react";

const ReserveAlert = () => {
  const [reserve, setReserve] = useState({
    bike: "",
    reserveKm: "",
    alertHours: "6"
  });

  const handleChange = (e) => {
    setReserve({ ...reserve, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const reserves = JSON.parse(localStorage.getItem("reserveAlerts") || "[]");
    reserves.push({ ...reserve, date: new Date().toLocaleString() });
    localStorage.setItem("reserveAlerts", JSON.stringify(reserves));
    alert("⛽ Reserve marked!");
    setReserve({ bike: "", reserveKm: "", alertHours: "6" });
  };

  return (
    <div style={styles.container}>
      <h2>🔔 Reserve Alert</h2>
      <input name="bike" placeholder="Bike Name" value={reserve.bike} onChange={handleChange} required />
      <input name="reserveKm" placeholder="Reserve KM" value={reserve.reserveKm} onChange={handleChange} required />
      <select name="alertHours" value={reserve.alertHours} onChange={handleChange}>
        <option value="6">6 Hours</option>
        <option value="12">12 Hours</option>
        <option value="24">24 Hours</option>
      </select>
      <button onClick={handleSave}>Save Reserve</button>
    </div>
  );
};

const styles = {
  container: { padding: 20, maxWidth: 500, margin: "auto", display: "flex", flexDirection: "column", gap: 10 }
};

export default ReserveAlert;
