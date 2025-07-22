import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signin = ({ onSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      onSignin(user);
    } catch (error) {
      alert("Login failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Sign In</h2>
      <input placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Signin;

