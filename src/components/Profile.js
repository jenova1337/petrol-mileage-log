import React, { useState } from "react";

const Profile = ({ user = {}, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedUser);
    }
    localStorage.setItem("user", JSON.stringify(editedUser));
    setIsEditing(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>👤 Profile</h2>

      {["name", "gender", "age", "mobile", "bikeCount"].map((field) => (
        <div key={field} style={{ marginBottom: "12px" }}>
          <label
            style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          {isEditing ? (
            <input
              type={field === "age" || field === "bikeCount" ? "number" : "text"}
              name={field}
              value={editedUser[field] || ""}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          ) : (
            <span style={{ paddingLeft: "8px" }}>
              {user?.[field] || "N/A"}
            </span>
          )}
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{
                padding: "8px 16px",
                marginRight: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
