// src/components/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    mobile: "",
    password: "",
    bikeCount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // 👈 prevent page reload
    try {
      const auth = getAuth();
      const trimmedMobile = form.mobile.trim();
      const email = `${trimmedMobile}@mileage.com`;

      console.log("📧 Creating user with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
      const uid = userCredential.user.uid;

      console.log("✅ Firebase Auth created. UID:", uid);
      await setDoc(doc(db, "users", uid), {
        ...form,
        uid,
        email,
        createdAt: new Date().toISOString(),
      });
      console.log("✅ Firestore write completed.");
      localStorage.setItem("user", JSON.stringify({ ...form, uid, email }));
      alert(`✅ Signup successful!\nEmail used: ${email}`);
      onSignup();
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert("Signup error: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Signup</h2>
      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Name" required autoComplete="name" onChange={handleChange} /><br />
        <input name="gender" placeholder="Gender" required autoComplete="sex" onChange={handleChange} /><br />
        <input name="age" placeholder="Age" type="number" required onChange={handleChange} /><br />
        <input name="mobile" placeholder="Mobile Number" required autoComplete="tel" onChange={handleChange} /><br />
        <input name="bikeCount" placeholder="Number of Bikes" type="number" required onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" required autoComplete="new-password" onChange={handleChange} /><br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
