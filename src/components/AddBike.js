import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../auth/useAuth";

const AddBike = () => {
  const { user } = useAuth(); // get current user
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
    const userBikesRef = collection(db, "users", user.uid, "bikes");
    const querySnapshot = await getDocs(userBikesRef);
    const bikes = [];
    querySnapshot.forEach((doc) => {
      bikes.push(doc.data());
    });
    setBikeList(bikes);
  };

  const handleChange = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const handleAddBike = async () => {
    if (!bike.name || !bike.model || !bike.km || !bike.date) {
      alert("Please fill required fields: Name, Model, KM, Purchase Date");
      return;
    }

    try {
      const userBikesRef = collection(db, "users", user.uid, "bikes");
      await addDoc(userBikesRef, bike);
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
    } catch (error) {
      console.error("Error adding bike:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚲 Add Bike</h2>
      <input
        type="text"
        name="name"
        placeholder="Bike Name"
        value={bike.name}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="model"
        placeholder="Model / Year"
        value={bike.model}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="km"
        placeholder="KM Reading"
        value={bike.km}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={bike.color}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="registration"
        placeholder="Registration No"
        value={bike.registration}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="engine"
        placeholder="Engine No (Optional)"
        value={bike.engine}
        onChange={handleChange}
      /><br />
      <input
        type="text"
        name="chassis"
        placeholder="Chassis No (Optional)"
        value={bike.chassis}
        onChange={handleChange}
      /><br />
      <input
        type="date"
        name="date"
        placeholder="Purchase Date"
        value={bike.date}
        onChange={handleChange}
      /><br />

      <button onClick={handleAddBike} style={{ marginTop: "10px" }}>
        ➕ Save Bike
      </button>

      <h4 style={{ marginTop: "20px" }}>📋 Your Bikes</h4>
      {bikeList.length === 0 ? (
        <p>No bikes added.</p>
      ) : (
        <ul>
          {bikeList.map((b, i) => (
            <li key={i}>
              {b.name} – {b.model} – {b.km} KM
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddBike;
