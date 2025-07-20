// src/components/Signin.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

const Signin = ({ onSignin }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const auth = getAuth();
      const trimmedMobile = mobile.trim();
      const email = `${trimmedMobile}@mileage.com`;

      console.log("🔐 Logging in with email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 🧠 Fetch full profile from Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("✅ Logged in. User saved to localStorage:", userData);
        onSignin(userCredential.user);
      } else {
        alert("⚠️ No profile found in Firestore.");
      }
    } catch (error) {
      alert("Signin failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Sign In</h2>
      <input placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} /><br />
      <input
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;
