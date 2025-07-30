// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);

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
      if (!newPassword) {
        alert("Enter a new password");
        return;
      }
      await updatePassword(user, newPassword);
      alert("Password updated!");
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      alert("Error updating password: " + err.message);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading profile...</p>;
  if (!profile) return <p style={{ padding: 20 }}>Profile not found.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>👤 Profile Details</h2>

      {editing ? (
        <>
          <input
            type="text"
            name="name"
            value={form.name || ""}
            placeholder="Name"
            onChange={handleEditChange}
          />
          <br />
          <input
            type="number"
            name="age"
            value={form.age || ""}
            placeholder="Age"
            onChange={handleEditChange}
          />
          <br />
          <input
            type="text"
            name="gender"
            value={form.gender || ""}
            placeholder="Gender"
            onChange={handleEditChange}
          />
          <br />
          <input
            type="text"
            name="mobile"
            value={form.mobile || ""}
            placeholder="Mobile"
            onChange={handleEditChange}
          />
          <br />
          <input
            type="number"
            name="bikeCount"
            value={form.bikeCount || ""}
            placeholder="No. of Bikes"
            onChange={handleEditChange}
          />
          <br />
          <button onClick={handleSaveProfile}>Save</button>
        </>
      ) : (
        <>
          <p>🧑 Name: {profile.name || "-"}</p>
          <p>🎂 Age: {profile.age || "-"}</p>
          <p>⚧️ Gender: {profile.gender || "-"}</p>
          <p>📧 Email: {profile.email || user.email}</p>
          <p>📱 Contact: {profile.mobile || "-"}</p>
          <p>🏍️ Bike Count: {profile.bikeCount || "-"}</p>
          <button onClick={() => setEditing(true)}>✏️ Edit Profile</button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>🔑 Change Password</h3>
        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Update Password</button>
      </div>
    </div>
  );
};

export default Profile;
