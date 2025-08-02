// src/components/Dashboard.js
import React from "react";
import Profile from "./Profile";
import Instructions from "./Instructions";
import AddBike from "./AddBike";
import BikeDetails from "./BikeDetails";
import ReserveAlert from "./ReserveAlert";
import PetrolPump from "./PetrolPump";
import Mileage from "./Mileage";
import Summary from "./Summary";
import MonthWiseExpense from "./MonthWiseExpense"; // NEW IMPORT

const Dashboard = ({ tab, setTab, onLogout, user }) => {
  const tabs = [
    { key: "profile", label: "👤 Profile" },
    { key: "instructions", label: "📘 Instructions" },
    { key: "addBike", label: "➕ Add Bike" },
    { key: "bikeDetails", label: "📋 Bike Details" },
    { key: "reserveAlert", label: "🔔 Reserve Alert" },
    { key: "petrolPump", label: "⛽ Petrol Pump" },
    { key: "mileage", label: "📊 Mileage" },
    { key: "summary", label: "📈 Summary" },
    { key: "monthExpense", label: "🗓️ Month-wise Expense" }, // NEW TAB
  ];

  const renderTabContent = () => {
    switch (tab) {
      case "profile":
        return <Profile user={user} />;
      case "instructions":
        return <Instructions />;
      case "addBike":
        return <AddBike user={user} />;
      case "bikeDetails":
        return <BikeDetails user={user} />;
      case "reserveAlert":
        return <ReserveAlert user={user} />;
      case "petrolPump":
        return <PetrolPump user={user} />;
      case "mileage":
        return <Mileage user={user} />;
      case "summary":
        return <Summary user={user} />;
      case "monthExpense": // NEW CASE
        return <MonthWiseExpense user={user} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Left Sidebar Tabs */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🏍️ Dashboard</h2>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              textAlign: "left",
              backgroundColor: tab === t.key ? "#4CAF50" : "#fff",
              color: tab === t.key ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={onLogout}
          style={{
            marginTop: "40px",
            padding: "10px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          🚪 Log Out
        </button>
      </div>

      {/* Right Content Area */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
