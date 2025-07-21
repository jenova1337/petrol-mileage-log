import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const Signin = ({ onSignin }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const auth = getAuth();
      const trimmedMobile = mobile.trim();
      const email = `${trimmedMobile}@mileage.com`;

      console.log("🔐 Logging in with:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in. UID:", userCredential.user.uid);
      onSignin();
    } catch (error) {
      console.error("❌ Signin error:", error.message);
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
