import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";

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

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      {screen === "signup" && <Signup onSignup={() => setScreen("signin")} />}
      {screen === "signin" && <Signin onSignin={handleSignin} />}
      {screen === "dashboard" && (
        <Dashboard user={user} onLogout={handleLogout} />
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
