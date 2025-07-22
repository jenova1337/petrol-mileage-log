import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { updatePassword } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
    setForm(localUser);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const uid = user.uid;
      await updateDoc(doc(db, "users", uid), form);
      localStorage.setItem("user", JSON.stringify({ ...form, uid }));
      setUser({ ...form, uid });
      alert("✅ Profile updated!");
      setEditMode(false);
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (!newPassword) return alert("Enter a new password");
      await updatePassword(auth.currentUser, newPassword);
      alert("🔑 Password changed successfully!");
      setNewPassword("");
    } catch (error) {
      alert("❌ Password update failed: " + error.message);
    }
  };

  if (!user) {
    return <p style={{ padding: 20 }}>⚠️ No user data found.</p>;
  }

  return (
    <div style={{
      padding: 20,
      maxWidth: 400,
      margin: "20px auto",
      border: "2px solid #4CAF50",
      borderRadius: 12,
      background: "#f9fff9",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#2e7d32" }}>👤 Profile Details</h2>

      {editMode ? (
        <>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" /><br />
          <input name="age" value={form.age} onChange={handleChange} placeholder="Age" /><br />
          <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" /><br />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" /><br />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" /><br />
          <input name="bikeCount" value={form.bikeCount} onChange={handleChange} placeholder="Bike Count" /><br />
          <button onClick={handleUpdate} style={{ marginTop: 10 }}>💾 Save</button>
          <button onClick={() => setEditMode(false)} style={{ marginLeft: 10 }}>❌ Cancel</button>
        </>
      ) : (
        <>
          <p><strong>🧑 Name:</strong> {user.name}</p>
          <p><strong>🎂 Age:</strong> {user.age}</p>
          <p><strong>⚧️ Gender:</strong> {user.gender}</p>
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>📱 Contact:</strong> {user.mobile}</p>
          <p><strong>🏍️ Bike Count:</strong> {user.bikeCount}</p>
          <button onClick={() => setEditMode(true)} style={{ marginTop: 10 }}>✏️ Edit Profile</button>
        </>
      )}

      <hr style={{ margin: "20px 0" }} />

      <div>
        <h4>🔑 Change Password</h4>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        /><br />
        <button onClick={handlePasswordChange} style={{ marginTop: 10 }}>Update Password</button>
      </div>
    </div>
  );
};

export default Profile;
