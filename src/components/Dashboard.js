// src/App.js
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import AddBike from "./components/AddBike";
import BikeDetails from "./components/BikeDetails";
import ReserveAlert from "./components/ReserveAlert";
import PetrolPump from "./components/PetrolPump";
import Mileage from "./components/Mileage";
import Summary from "./components/Summary";
import Instructions from "./components/Instructions";

const App = () => {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("signin");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setScreen("dashboard");
    }
  }, []);

  const handleSignin = (userData) => {
    setUser(userData);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("signin");
    localStorage.removeItem("user");
  };

  const sectionStyle = {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "24px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "left",
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "960px", margin: "0 auto" }}>
      {screen === "signup" && <Signup onSignup={() => setScreen("signin")} />}
      {screen === "signin" && <Signin onSignin={handleSignin} />}

      {screen === "dashboard" && (
        <>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={handleLogout}
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

          <h1 style={{ textAlign: "left", marginBottom: "30px" }}>
            🏍️ Petrol Expense Monitor Dashboard
          </h1>

          <div style={sectionStyle}>
            <h2>👤 Profile</h2>
            <Profile user={user} />
          </div>

          <div style={sectionStyle}>
            <h2>📘 Instructions</h2>
            <Instructions />
          </div>

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
        </>
      )}

      {/* Signup / Signin Footer */}
      {screen !== "dashboard" && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          {screen === "signin" ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setScreen("signup")}>Sign Up</button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setScreen("signin")}>Sign In</button>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
