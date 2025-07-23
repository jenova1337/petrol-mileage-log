import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Profile Details</h2>
      <p>🧑 Name: {profile.name || "-"}</p>
      <p>🎂 Age: {profile.age || "-"}</p>
      <p>⚧️ Gender: {profile.gender || "-"}</p>
      <p>📧 Email: {profile.email || user.email}</p>
      <p>📱 Contact: {profile.mobile || "-"}</p>
      <p>🏍️ Bike Count: {profile.bikeCount || "-"}</p>
    </div>
  );
};

export default Profile;
