// src/components/Dashboard.js
import React from "react";
import Profile from "./Profile";
import AddBike from "./AddBike";
import BikeDetails from "./BikeDetails";
import ReserveAlert from "./ReserveAlert";
import PetrolPump from "./PetrolPump";
import Mileage from "./Mileage";
import Summary from "./Summary";
import Instructions from "./Instructions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/signin");
  };

  const sectionStyle = {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "24px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        🛵 Petrol Expense Monitor Dashboard
      </h1>

      {/* Profile Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>👤 Profile</h2>
        <Profile />
      </div>

      {/* Add Bike Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>➕ Add Bike</h2>
        <AddBike />
      </div>

      {/* Bike Details Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>📋 Bike Details</h2>
        <BikeDetails />
      </div>

      {/* Reserve Alert Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>⛽ Reserve Alert</h2>
        <ReserveAlert />
      </div>

      {/* Petrol Pump Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>🛢️ Petrol Log</h2>
        <PetrolPump />
      </div>

      {/* Mileage Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>📊 Mileage Report</h2>
        <Mileage />
      </div>

      {/* Summary Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>📈 Summary</h2>
        <Summary />
      </div>

      {/* Instructions Tab */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "16px" }}>📘 Instructions</h2>
        <Instructions />
      </div>

      {/* Logout Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4d4d",
            color: "#fff",
            padding: "10px 30px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

