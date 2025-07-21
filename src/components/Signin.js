// src/components/Signin.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const Signin = ({ onSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("user", JSON.stringify(userCredential.user));
      alert("✅ Login successful!");
      onSignin();
    } catch (error) {
      alert("Login error: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Sign In</h2>
      <input
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;
