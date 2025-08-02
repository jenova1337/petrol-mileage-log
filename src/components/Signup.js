import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Signup = ({ onSignupSuccess, onShowSignin }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        age,
        gender,
        mobile,
        email
      });

      alert("Signup successful!");
      onSignupSuccess && onSignupSuccess();
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#e6f2ff"
    }}>
      <div style={{
        backgroundColor: "#b3d9ff",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        width: "320px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "60px", color: "#0059b3", marginBottom: "20px" }}>
          👤
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {/* Single SIGN UP button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            {loading ? "Signing..." : "SIGN UP"}
          </button>
        </form>

        {/* Note below signup form */}
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onShowSignin && onShowSignin()}
            style={{
              background: "none",
              border: "none",
              color: "#004080",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "underline",
              padding: 0
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

export default Signup;
