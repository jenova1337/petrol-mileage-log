import React from "react";
import Profile from "./Profile";
import AddBike from "./AddBike";
import BikeDetails from "./BikeDetails";
import ReserveAlert from "./ReserveAlert";
import PetrolPump from "./PetrolPump";
import Mileage from "./Mileage";
import Summary from "./Summary";
import Instructions from "./Instructions"; // ✅ added

const Dashboard = ({ tab, setTab, onLogout, user }) => {
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
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
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
        <div style={tabStyle("instructions")} onClick={() => setTab("instructions")}>📘 Instructions</div>
      </div>

      <div style={{ padding: "20px", background: "#fafafa", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        {tab === "profile" && <Profile user={user} />}
        {tab === "addBike" && <AddBike />}
        {tab === "bikeDetails" && <BikeDetails />}
        {tab === "reserve" && <ReserveAlert />}
        {tab === "pump" && <PetrolPump />}
        {tab === "mileage" && <Mileage />}
        {tab === "summary" && <Summary />}
        {tab === "instructions" && <Instructions />}
      </div>
    </div>
  );
};

export default Dashboard;
