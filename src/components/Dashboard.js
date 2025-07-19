import React from "react";

const Dashboard = ({ tab, setTab, onLogout }) => {
  const tabStyle = (key) => ({
    padding: "8px 12px",
    marginRight: 10,
    cursor: "pointer",
    borderBottom: tab === key ? "2px solid blue" : "none",
    fontWeight: tab === key ? "bold" : "normal",
    background: "#eee",
    borderRadius: "5px",
  });

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <button onClick={onLogout}>🚪 Log Out</button>
      </div>

      <h2>🏍️ Petrol Expense Monitor Dashboard</h2>

      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 20 }}>
        <div style={tabStyle("profile")} onClick={() => setTab("profile")}>👤 Profile</div>
        <div style={tabStyle("addBike")} onClick={() => setTab("addBike")}>➕ Add Bike</div>
        <div style={tabStyle("bikeDetails")} onClick={() => setTab("bikeDetails")}>📋 Bike Details</div>
        <div style={tabStyle("reserve")} onClick={() => setTab("reserve")}>🔔 Reserve Alert</div>
        <div style={tabStyle("pump")} onClick={() => setTab("pump")}>⛽ Petrol Pump</div>
        <div style={tabStyle("mileage")} onClick={() => setTab("mileage")}>📊 Mileage</div>
        <div style={tabStyle("summary")} onClick={() => setTab("summary")}>📈 Summary</div>
      </div>
    </div>
  );
};

export default Dashboard;
