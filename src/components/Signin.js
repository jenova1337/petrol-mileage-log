import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signin = ({ onSigninSuccess, onShowSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      onSigninSuccess && onSigninSuccess();
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + err.message);
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
        width: "300px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "60px", color: "#0059b3", marginBottom: "20px" }}>
          👤
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "14px",
                color: "#333",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            marginBottom: "15px",
            alignItems: "center"
          }}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span style={{ color: "#004080", cursor: "pointer" }}>
              Forgot password?
            </span>
          </div>

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
            }}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          {/* Sign up link just below button */}
          <div style={{ marginTop: "15px" }}>
            <span style={{ color: "#333" }}>Don't have an account? </span>
            <span
              style={{
                color: "#0047b3",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                // Use parent callback if available
                if (onShowSignup) {
                  onShowSignup();
                } else {
                  alert("Switch to signup screen!");
                }
              }}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
