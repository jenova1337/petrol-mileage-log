// src/components/Dashboard.js
import React, { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { key: "profile", label: "👤 Profile" },
    { key: "instructions", label: "📘 Instructions" },
    { key: "addBike", label: "➕ Add Bike" },
    { key: "bikeDetails", label: "📋 Bike Details" },
    { key: "reserveAlert", label: "🔔 Reserve Alert" },
    { key: "petrolPump", label: "⛽ Petrol Pump" },
    { key: "mileage", label: "📊 Mileage" },
    { key: "summary", label: "📈 Summary" },
    { key: "monthExpense", label: "🗓️ Month-wise Expense" },
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
      case "monthExpense":
        return <MonthWiseExpense user={user} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ height: "100vh", fontFamily: "sans-serif", overflow: "hidden" }}>
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1100,
          background: "#4CAF50",
          color: "#fff",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? "0" : "-240px",
          width: "220px",
          height: "100%",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRight: "1px solid #ccc",
          boxShadow: sidebarOpen ? "2px 0 5px rgba(0,0,0,0.3)" : "none",
          transition: "left 0.3s ease",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        <button
  onClick={() => setSidebarOpen(false)}
  style={{
    position: "absolute",
    top: "10px",
    right: "-45px", // Move X mark outside sidebar towards right
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#000",
    zIndex: 1002,
  }}
>
  ✖
</button>

        <h2 style={{ marginBottom: "20px" }}>🏍️ Dashboard</h2>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key);
              setSidebarOpen(false);
            }}
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

      {/* Content */}
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          padding: "30px",
        }}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
