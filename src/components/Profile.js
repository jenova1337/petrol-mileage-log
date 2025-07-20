import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../auth/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{
      padding: "20px",
      border: "2px solid #90caf9",
      backgroundColor: "#e3f2fd",
      borderRadius: "10px",
      maxWidth: "700px",
      margin: "auto"
    }}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Mobile:</strong> {profile.mobile}</p>
      <p><strong>Total Bikes:</strong> {profile.bikeCount}</p>
    </div>
  );
};

export default Profile;
