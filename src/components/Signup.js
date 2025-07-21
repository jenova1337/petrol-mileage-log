// src/components/Signup.js
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
    email: "",
    password: "",
    bikeCount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        ...form,
        uid,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("user", JSON.stringify({ ...form, uid }));
      alert("✅ Signup successful!");
      onSignup(); // Go to dashboard
    } catch (error) {
      alert("Signup error: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="gender" placeholder="Gender" onChange={handleChange} /><br />
      <input name="age" placeholder="Age" type="number" onChange={handleChange} /><br />
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} /><br />
      <input name="email" placeholder="Email ID" onChange={handleChange} /><br />
      <input name="bikeCount" placeholder="Number of Bikes" type="number" onChange={handleChange} /><br />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
};

export default Signup;
