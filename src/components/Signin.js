import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Signin = ({ onSignin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCredential.user.uid;

      // Get user data from Firestore
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        localStorage.setItem("user", JSON.stringify(userData));
        alert("✅ Login successful!");
        onSignin();
      } else {
        alert("⚠️ User data not found in Firestore.");
      }
    } catch (error) {
      alert("Signin failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Sign In</h2>
      <input
        name="email"
        type="email"
        placeholder="Email ID"
        onChange={handleChange}
      /><br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;
