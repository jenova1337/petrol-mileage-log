import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const AddBike = ({ user }) => {
  const [bike, setBike] = useState({
    name: "",
    model: "",
    km: "",
    color: "",
    registration: "",
    engine: "",
    chassis: "",
    date: "",
  });
  const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    if (user) fetchBikes();
  }, [user]);

  const fetchBikes = async () => {
    const ref = collection(db, "users", user.uid, "bikes");
    const snap = await getDocs(ref);
    const bikes = [];
    snap.forEach((docItem) => {
      bikes.push({ id: docItem.id, ...docItem.data() });
    });
    setBikeList(bikes);
  };

  const handleChange = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const handleAddBike = async () => {
    if (!bike.name || !bike.model || !bike.km || !bike.date) {
      alert("Please fill Name, Model, KM, and Purchase Date");
      return;
    }

    try {
      const bikeId = `${bike.name}_${Date.now()}`;
      const bikeDoc = doc(db, "users", user.uid, "bikes", bikeId);

      await setDoc(bikeDoc, bike);

      setBike({
        name: "",
        model: "",
        km: "",
        color: "",
        registration: "",
        engine: "",
        chassis: "",
        date: "",
      });

      fetchBikes();
    } catch (err) {
      console.error("Error adding bike:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🚲 Add Bike</h2>

      {/* Form fields */}
      <label>Bike Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Bike Name"
        value={bike.name}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Model / Year:</label>
      <input
        type="text"
        name="model"
        placeholder="Model / Year"
        value={bike.model}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>KM Reading:</label>
      <input
        type="text"
        name="km"
        placeholder="KM Reading"
        value={bike.km}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Color:</label>
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={bike.color}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Registration No:</label>
      <input
        type="text"
        name="registration"
        placeholder="Registration No"
        value={bike.registration}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Engine No (Optional):</label>
      <input
        type="text"
        name="engine"
        placeholder="Engine No (Optional)"
        value={bike.engine}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Chassis No (Optional):</label>
      <input
        type="text"
        name="chassis"
        placeholder="Chassis No (Optional)"
        value={bike.chassis}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Purchase Date:</label>
      <input
        type="date"
        name="date"
        value={bike.date}
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        onClick={handleAddBike}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ➕ Save Bike
      </button>

      <h4 style={{ marginTop: "30px" }}>📋 Your Bikes</h4>
      {bikeList.length === 0 ? (
        <p>No bikes added.</p>
      ) : (
        <ul>
          {bikeList.map((b) => (
            <li key={b.id} style={{ marginBottom: "8px" }}>
              <strong>{b.name}</strong> – {b.model} – {b.km} KM
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Style for inputs
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #b3d1ff",
  borderRadius: "8px",
  fontSize: "15px",
};

export default AddBike;
