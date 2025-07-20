import React from "react";

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e0f7fa", // Light cyan background
        border: "2px solid #00796b", // Teal border
        borderRadius: "12px",
        maxWidth: "500px",
        margin: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#004d40" }}>👤 Profile</h2>
      <p><strong>Name:</strong> {user?.name || "N/A"}</p>
      <p><strong>Gender:</strong> {user?.gender || "N/A"}</p>
      <p><strong>Age:</strong> {user?.age || "N/A"}</p>
      <p><strong>Mobile:</strong> {user?.mobile || "N/A"}</p>
      <p><strong>Total Bikes:</strong> {user?.bikeCount || 0}</p>
    </div>
  );
};

export default Profile;
