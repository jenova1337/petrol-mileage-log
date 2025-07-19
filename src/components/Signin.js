import React, { useState } from "react";

const Signin = ({ onSignin }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.mobile === mobile && user.password === password) {
      alert("Login successful!");
      onSignin(user);
    } else {
      alert("Invalid mobile number or password!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: 20, maxWidth: 400, margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: 10 }
};

export default Signin;
