// src/components/Signin.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signin = ({ onSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));
      alert("✅ Signin successful!");
      onSignin(); // change screen to dashboard
    } catch (error) {
      console.error("❌ Signin error:", error.message);
      alert("Signin error: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Signin</h2>
      <input
        type="email"
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;
