import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { getAuth, signOut } from "firebase/auth";
import useAuth from "./auth/useAuth";

const App = () => {
  const { user } = useAuth();
  const [screen, setScreen] = useState("signin");
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    if (user) {
      setScreen("dashboard");
    } else {
      setScreen("signin");
    }
  }, [user]);

  const handleLogout = () => {
    signOut(getAuth());
    setScreen("signin");
  };

  const handleSigninSuccess = () => {
    setScreen("dashboard");
  };

  const handleSignupSuccess = () => {
    setScreen("dashboard");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      {screen === "signin" && (
        <Signin
          onSigninSuccess={handleSigninSuccess}
          onShowSignup={() => setScreen("signup")}
        />
      )}

      {screen === "signup" && (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onShowSignin={() => setScreen("signin")}
        />
      )}

      {screen === "dashboard" && (
        <Dashboard
          tab={tab}
          setTab={setTab}
          onLogout={handleLogout}
          user={user}
        />
      )}
    </div>
  );
};

export default App;
