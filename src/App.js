import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AddBike from "./components/AddBike";
import BikeDetails from "./components/BikeDetails";
import ReserveAlert from "./components/ReserveAlert";
import PetrolPump from "./components/PetrolPump";
import Mileage from "./components/Mileage";
import Summary from "./components/Summary";

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

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      {/* Signup / Signin */}
      {screen === "signup" && <Signup onSignup={() => setScreen("signin")} />}
      {screen === "signin" && <Signin onSignin={handleSignin} />}

      {/* Dashboard */}
      {screen === "dashboard" && (
        <>
          <Dashboard tab={tab} setTab={setTab} onLogout={handleLogout} />

          {/* Render each tab */}
          {tab === "profile" && <Profile user={user} />}
          {tab === "addBike" && <AddBike />}
          {tab === "bikeDetails" && <BikeDetails />}
          {tab === "reserve" && <ReserveAlert />}
          {tab === "pump" && <PetrolPump />}
          {tab === "mileage" && <Mileage />}
          {tab === "summary" && <Summary />}
        </>
      )}

      {/* Navigation links (bottom) */}
      {screen !== "dashboard" && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          {screen === "signin" ? (
            <p>Don't have an account? <button onClick={() => setScreen("signup")}>Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setScreen("signin")}>Sign In</button></p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
