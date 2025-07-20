// src/components/Signin.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const Signin = ({ onSignin }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const auth = getAuth();
      const email = `${mobile}@mileage.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onSignin(userCredential.user);
    } catch (error) {
      alert("Signin failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Sign In</h2>
      <input placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;
