import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  // Password change
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setForm(data);
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, form);
      setProfile(form);
      setEditing(false);
      alert("Profile updated!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile!");
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        alert("Fill all fields");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordFields(false);
    } catch (err) {
      console.error("Error updating password:", err);
      alert("Error updating password: " + err.message);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading profile...</p>;
  if (!profile) return <p style={{ padding: 20 }}>Profile not found.</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "30px",
        background: "linear-gradient(135deg, #e6f2ff, #f9f9ff)",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
          border: "2px solid #cce0ff",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#0059b3",
            marginBottom: "20px",
          }}
        >
          👤 Profile Details
        </h2>

        {editing ? (
          <>
            {renderInput("name", "Name", form.name, handleEditChange)}
            {renderInput("age", "Age", form.age, handleEditChange, "number")}
            {renderInput("gender", "Gender", form.gender, handleEditChange)}
            {renderInput("mobile", "Mobile", form.mobile, handleEditChange)}
            <button style={buttonStyle} onClick={handleSaveProfile}>
              💾 Save
            </button>
          </>
        ) : (
          <div
            style={{
              lineHeight: "1.8",
              fontSize: "16px",
              border: "1px solid #cce0ff",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              background: "#f9fcff",
            }}
          >
            <p><b>🧑 Name:</b> {profile.name || "-"}</p>
            <p><b>🎂 Age:</b> {profile.age || "-"}</p>
            <p><b>⚧️ Gender:</b> {profile.gender || "-"}</p>
            <p><b>📧 Email:</b> {profile.email || user.email}</p>
            <p><b>📱 Contact:</b> {profile.mobile || "-"}</p>
          </div>
        )}

        {!editing && (
          <button
            style={{ ...buttonStyle, background: "#00b33c" }}
            onClick={() => setEditing(true)}
          >
            ✏️ Edit Profile
          </button>
        )}

        {/* Change password */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#0059b3" }}>🔑 Change Password</h3>
          {!showPasswordFields ? (
            <button
              style={{ ...buttonStyle, background: "#ff9933" }}
              onClick={() => setShowPasswordFields(true)}
            >
              Change Password
            </button>
          ) : (
            <div
              style={{
                marginTop: "15px",
                border: "1px solid #cce0ff",
                padding: "15px",
                borderRadius: "10px",
                background: "#f0f8ff",
              }}
            >
              {renderInput("", "Old Password", oldPassword, (e) =>
                setOldPassword(e.target.value), "password")}
              {renderInput("", "New Password", newPassword, (e) =>
                setNewPassword(e.target.value), "password")}
              {renderInput("", "Confirm New Password", confirmPassword, (e) =>
                setConfirmPassword(e.target.value), "password")}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{ ...buttonStyle, background: "#00b33c", flex: 1 }}
                  onClick={handlePasswordChange}
                >
                  Update
                </button>
                <button
                  style={{ ...buttonStyle, background: "#999", flex: 1 }}
                  onClick={() => setShowPasswordFields(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper styled input
const renderInput = (name, placeholder, value, onChange, type = "text") => (
  <input
    type={type}
    name={name}
    value={value || ""}
    placeholder={placeholder}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #b3d1ff",
      borderRadius: "8px",
      fontSize: "15px",
    }}
  />
);

const buttonStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  backgroundColor: "#0066cc",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Profile;
