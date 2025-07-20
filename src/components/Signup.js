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

  const handleSignup = async () => {
    const auth = getAuth();
    const trimmedMobile = form.mobile.trim();
    const email = `${trimmedMobile}@mileage.com`;

    try {
      console.log("⏳ Creating user with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
      const uid = userCredential.user.uid;
      console.log("✅ Firebase Auth created with UID:", uid);

      console.log("⏳ Writing user profile to Firestore...");
      await setDoc(doc(db, "users", uid), {
        ...form,
        uid,
        email,
        createdAt: new Date().toISOString(),
      });
      console.log("✅ Profile written to Firestore!");

      alert(`✅ Signup successful!\nFake Email: ${email}`);
      onSignup();

    } catch (error) {
      console.error("🔥 Signup error:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="gender" placeholder="Gender" onChange={handleChange} /><br />
      <input name="age" placeholder="Age" type="number" onChange={handleChange} /><br />
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} /><br />
      <input name="bikeCount" placeholder="Number of Bikes" type="number" onChange={handleChange} /><br />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
};

export default Signup;
