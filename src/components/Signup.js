import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

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

  const handleSignup = async () => {
    try {
      const auth = getAuth();
      const trimmedMobile = form.mobile.trim();
      const email = `${trimmedMobile}@mileage.com`;

      console.log("📧 Creating user with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
      const uid = userCredential.user.uid;

      console.log("✅ Firebase Auth created. UID:", uid);

      // Save user profile to Firestore
      await setDoc(doc(db, "users", uid), {
        ...form,
        uid,
        email,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Firestore profile saved.");
      alert(`✅ Signup successful!\nEmail used: ${email}`);
      onSignup();
    } catch (error) {
      console.error("❌ Signup error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Signup</h2>
      <input name="name" autoComplete="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="gender" autoComplete="sex" placeholder="Gender" onChange={handleChange} /><br />
      <input name="age" autoComplete="bday" placeholder="Age" type="number" onChange={handleChange} /><br />
      <input name="mobile" autoComplete="tel" placeholder="Mobile Number" onChange={handleChange} /><br />
      <input name="bikeCount" autoComplete="off" placeholder="Number of Bikes" type="number" onChange={handleChange} /><br />
      <input name="password" autoComplete="new-password" placeholder="Password" type="password" onChange={handleChange} /><br />
      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
};

export default Signup;
