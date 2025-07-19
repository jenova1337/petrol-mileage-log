import React, { useState } from "react";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    mobile: "",
    password: "",
    bikeCount: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    alert("Signup successful. Please login.");
    onSignup();
  };

  return (
    <div style={styles.container}>
      <h2>📝 Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="gender" placeholder="Gender" required onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" required onChange={handleChange} />
        <input name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <input name="bikeCount" type="number" placeholder="Number of Bikes" required onChange={handleChange} />
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
