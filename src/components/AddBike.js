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
      bikes.push({ id: docItem.id, ...docItem.data() }); // include ID
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
      // create a custom id (bike name + timestamp)
      const bikeId = `${bike.name}_${Date.now()}`;
      const bikeDoc = doc(db, "users", user.uid, "bikes", bikeId);

      await setDoc(bikeDoc, bike); // store with that ID

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
    <div style={{ padding: "20px" }}>
      <h2>🚲 Add Bike</h2>

      <input type="text" name="name" placeholder="Bike Name"
        value={bike.name} onChange={handleChange} /><br />
      <input type="text" name="model" placeholder="Model / Year"
        value={bike.model} onChange={handleChange} /><br />
      <input type="text" name="km" placeholder="KM Reading"
        value={bike.km} onChange={handleChange} /><br />
      <input type="text" name="color" placeholder="Color"
        value={bike.color} onChange={handleChange} /><br />
      <input type="text" name="registration" placeholder="Registration No"
        value={bike.registration} onChange={handleChange} /><br />
      <input type="text" name="engine" placeholder="Engine No (Optional)"
        value={bike.engine} onChange={handleChange} /><br />
      <input type="text" name="chassis" placeholder="Chassis No (Optional)"
        value={bike.chassis} onChange={handleChange} /><br />
      <input type="date" name="date" value={bike.date}
        onChange={handleChange} /><br />

      <button onClick={handleAddBike} style={{ marginTop: "10px" }}>
        ➕ Save Bike
      </button>

      <h4 style={{ marginTop: "20px" }}>📋 Your Bikes</h4>
      {bikeList.length === 0 ? (
        <p>No bikes added.</p>
      ) : (
        <ul>
          {bikeList.map((b, i) => (
            <li key={b.id}>
              <strong>{b.name}</strong> – {b.model} – {b.km} KM
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddBike;
