// src/components/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, age, email, password, confirmPassword, gender, contact } = form;

    if (!name || !age || !email || !password || !confirmPassword || !gender || !contact) {
      alert("❗Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("❗Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        name,
        age,
        email,
        gender,
        contact,
        uid,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("user", JSON.stringify({ name, age, email, gender, contact, uid }));
      alert("✅ Signup successful!");
      onSignup();
    } catch (error) {
      alert("Signup failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Create Account</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} /><br />
      <input name="email" type="email" placeholder="Email ID" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} /><br />
      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select><br />
      <input name="contact" placeholder="Contact Number" onChange={handleChange} /><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
