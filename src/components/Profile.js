// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  // For password change
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

      // Re-authenticate with old password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      alert("Password updated successfully!");

      // Reset fields
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
          <button onClick={handleSaveProfile}>Save</button>
        </>
      ) : (
        <>
          <p>🧑 Name: {profile.name || "-"}</p>
          <p>🎂 Age: {profile.age || "-"}</p>
          <p>⚧️ Gender: {profile.gender || "-"}</p>
          <p>📧 Email: {profile.email || user.email}</p>
          <p>📱 Contact: {profile.mobile || "-"}</p>
          <button onClick={() => setEditing(true)}>✏️ Edit Profile</button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>🔑 Change Password</h3>
        {!showPasswordFields ? (
          <button onClick={() => setShowPasswordFields(true)}>
            Change Password
          </button>
        ) : (
          <div style={{ marginTop: "10px" }}>
            <input
              type="password"
              value={oldPassword}
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <button onClick={handlePasswordChange}>Update Password</button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setShowPasswordFields(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
