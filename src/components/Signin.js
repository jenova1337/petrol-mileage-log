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
      onSignin(); // Go to dashboard
    } catch (error) {
      alert("Signin failed: " + error.message);
      console.error("❌ Signin error:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Sign In</h2>
      <input
        name="email"
        id="email"
        autoComplete="email"
        placeholder="Email ID"
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        name="password"
        id="password"
        type="password"
        autoComplete="current-password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;
