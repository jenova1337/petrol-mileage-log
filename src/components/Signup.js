// src/Signup.js
import React, { useState } from "react";

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    bikeCount: "",
    mobile: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Signup successful!");
    onSignup();
  };

  return (
    <div style={styles.container}>
      <h2>🚀 Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="gender" placeholder="Gender" required onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" required onChange={handleChange} />
        <input name="bikeCount" type="number" placeholder="No. of Bikes" required onChange={handleChange} />
        <input name="mobile" type="tel" placeholder="Mobile Number" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: 20, maxWidth: 400, margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: 10 }
};

export default Signup;

