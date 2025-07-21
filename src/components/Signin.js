// src/components/Signin.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const Signin = ({ onSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      onSignin(userCredential.user);
    } catch (error) {
      alert("Signin failed: " + error.message);
      console.error("Signin error:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Sign In</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;
