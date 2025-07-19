import React from "react";

const Profile = ({ user }) => {
  const currentUser = user || JSON.parse(localStorage.getItem("user"));
  if (!currentUser) return <p>No profile data found.</p>;

  return (
    <div style={styles.container}>
      <h2>👤 Profile</h2>
      <table style={styles.table}>
        <tbody>
          <tr><td>Name:</td><td>{currentUser.name}</td></tr>
          <tr><td>Gender:</td><td>{currentUser.gender}</td></tr>
          <tr><td>Age:</td><td>{currentUser.age}</td></tr>
          <tr><td>Mobile:</td><td>{currentUser.mobile}</td></tr>
          <tr><td>No. of Bikes:</td><td>{currentUser.bikeCount}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default Profile;
