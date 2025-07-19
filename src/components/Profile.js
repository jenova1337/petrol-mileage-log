import React from "react";

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user?.name || "N/A"}</p>
      <p><strong>Gender:</strong> {user?.gender || "N/A"}</p>
      <p><strong>Age:</strong> {user?.age || "N/A"}</p>
      <p><strong>Mobile:</strong> {user?.mobile || "N/A"}</p>
      <p><strong>Total Bikes:</strong> {user?.bikeCount || 0}</p>
    </div>
  );
};

export default Profile;
