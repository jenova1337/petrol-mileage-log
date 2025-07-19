import React from "react";
import Profile from "./Profile";
import Instructions from "./Instructions";
import AddBike from "./AddBike";
import BikeDetails from "./BikeDetails";
import ReserveAlert from "./ReserveAlert";
import PetrolPump from "./PetrolPump";
import Mileage from "./Mileage";
import Summary from "./Summary";

const Dashboard = ({ tab, setTab, onLogout, user }) => {
  const sectionStyle = {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "left",
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#ff4d4d",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          🚪 Log Out
        </button>
      </div>

      <h1 style={{ marginBottom: "30px" }}>🏍️ Petrol Expense Monitor Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Left Column: Profile & Instructions */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
          <div style={sectionStyle}>
            <h2>👤 Profile</h2>
            <Profile user={user} />
          </div>

          <div style={sectionStyle}>
            <h2>📘 Instructions</h2>
            <Instructions />
          </div>
        </div>

        {/* Right Column: Rest of the sections */}
        <div style={{ flex: "2 1 600px", minWidth: "600px" }}>
          <div style={sectionStyle}>
            <h2>➕ Add Bike</h2>
            <AddBike />
          </div>

          <div style={sectionStyle}>
            <h2>📋 Bike Details</h2>
            <BikeDetails />
          </div>

          <div style={sectionStyle}>
            <h2>🔔 Reserve Alert</h2>
            <ReserveAlert />
          </div>

          <div style={sectionStyle}>
            <h2>⛽ Petrol Pump</h2>
            <PetrolPump />
          </div>

          <div style={sectionStyle}>
            <h2>📊 Mileage</h2>
            <Mileage />
          </div>

          <div style={sectionStyle}>
            <h2>📈 Summary</h2>
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
