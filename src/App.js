// src/App.js
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { getAuth, signOut } from "firebase/auth";
import useAuth from "./auth/useAuth";

const App = () => {
  const firebaseUser = useAuth(); // from custom hook
  const [screen, setScreen] = useState("signin");
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    if (firebaseUser) {
      setScreen("dashboard");
    } else {
      setScreen("signin");
    }
  }, [firebaseUser]);

  const handleLogout = () => {
    signOut(getAuth());
    setScreen("signin");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      {screen === "signup" && <Signup onSignup={() => setScreen("dashboard")} />}
      {screen === "signin" && <Signin onSignin={() => setScreen("dashboard")} />}
      {screen === "dashboard" && (
        <Dashboard tab={tab} setTab={setTab} onLogout={handleLogout} user={firebaseUser} />
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
