import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import useAuth from "../auth/useAuth";

const BikeDetails = () => {
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    if (user) fetchBikes();
  }, [user]);

  const fetchBikes = async () => {
    const userBikesRef = collection(db, "users", user.uid, "bikes");
    const querySnapshot = await getDocs(userBikesRef);
    const bikeData = [];
    querySnapshot.forEach((doc) => {
      bikeData.push(doc.data());
    });
    setBikes(bikeData);
  };

  const getAge = (purchaseDate) => {
    if (!purchaseDate) return "N/A";
    const purchase = new Date(purchaseDate);
    const now = new Date();
    const years = now.getFullYear() - purchase.getFullYear();
    let months = now.getMonth() - purchase.getMonth();
    if (months < 0) {
      months += 12;
    }
    return `${years} yr ${months} mo`;
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f1f8e9", // Light green
        border: "2px solid #689f38", // Border green
        borderRadius: "12px",
        maxWidth: "900px",
        margin: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#33691e" }}>📋 Bike Details</h2>

      {bikes.length === 0 ? (
        <p>📭 No bikes added yet.</p>
      ) : (
        bikes.map((bike, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "20px",
              padding: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid #c5e1a5",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <p><strong>Bike Name:</strong> {bike.name || "N/A"}</p>
            <p><strong>Model / Year:</strong> {bike.model || "N/A"}</p>
            <p><strong>Color:</strong> {bike.color || "N/A"}</p>
            <p><strong>KM Reading:</strong> {bike.km || "N/A"}</p>
            <p><strong>Reg. Number:</strong> {bike.registration || "N/A"}</p>
            <p><strong>Engine No:</strong> {bike.engine || "N/A"}</p>
            <p><strong>Chassis No:</strong> {bike.chassis || "N/A"}</p>
            <p><strong>Purchase Date:</strong> {bike.date || "N/A"}</p>
            <p><strong>Bike Age:</strong> {getAge(bike.date)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BikeDetails;
