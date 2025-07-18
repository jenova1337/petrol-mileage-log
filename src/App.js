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
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const App = () => {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("signin");
  const [tab, setTab] = useState("profile");

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

  const tabStyle = (key) => ({
    padding: "8px 12px",
    marginRight: 10,
    cursor: "pointer",
    borderBottom: tab === key ? "2px solid blue" : "none",
    fontWeight: tab === key ? "bold" : "normal",
    background: "#eee",
    borderRadius: "5px"
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      {screen === "signup" && <Signup onSignup={() => setScreen("signin")} />}
      {screen === "signin" && <Signin onSignin={handleSignin} />}

      {screen === "dashboard" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <h2>🏍️ Petrol Mileage Log Dashboard</h2>
            <Button onClick={handleLogout}>🚪 Logout</Button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 20 }}>
            <div style={tabStyle("profile")} onClick={() => setTab("profile")}>👤 Profile</div>
            <div style={tabStyle("addBike")} onClick={() => setTab("addBike")}>➕ Add Bike</div>
            <div style={tabStyle("bikeDetails")} onClick={() => setTab("bikeDetails")}>📋 Bike Details</div>
            <div style={tabStyle("reserve")} onClick={() => setTab("reserve")}>🔔 Reserve Alert</div>
            <div style={tabStyle("pump")} onClick={() => setTab("pump")}>⛽ Petrol Pump</div>
            <div style={tabStyle("mileage")} onClick={() => setTab("mileage")}>📊 Mileage</div>
            <div style={tabStyle("summary")} onClick={() => setTab("summary")}>📈 Summary</div>
          </div>

          <Card className="p-4 rounded-xl shadow-md mb-4">
            <CardContent>
              {tab === "profile" && <Profile user={user} />}
              {tab === "addBike" && <AddBike />}
              {tab === "bikeDetails" && <BikeDetails />}
              {tab === "reserve" && <ReserveAlert />}
              {tab === "pump" && <PetrolPump />}
              {tab === "mileage" && <Mileage />}
              {tab === "summary" && <Summary />}
            </CardContent>
          </Card>
        </>
      )}

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
