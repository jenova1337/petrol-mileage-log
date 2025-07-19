import React, { useState } from "react";

const AddBike = () => {
  const [bike, setBike] = useState({
    name: "",
    model: "",
    year: "",
    kms: "",
    purchaseDate: "",
    color: "",
    regNo: "",
    engineNo: "",
    chassisNo: ""
  });

  const handleChange = (e) => {
    setBike((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bikes = JSON.parse(localStorage.getItem("bikes") || "[]");
    bikes.push(bike);
    localStorage.setItem("bikes", JSON.stringify(bikes));
    alert("✅ Bike added!");
    setBike({
      name: "",
      model: "",
      year: "",
      kms: "",
      purchaseDate: "",
      color: "",
      regNo: "",
      engineNo: "",
      chassisNo: ""
    });
  };

  return (
    <div style={styles.container}>
      <h2>➕ Add Bike</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Bike Name" value={bike.name} onChange={handleChange} required />
        <input name="model" placeholder="Model" value={bike.model} onChange={handleChange} required />
        <input name="year" type="number" placeholder="Year" value={bike.year} onChange={handleChange} />
        <input name="kms" type="number" placeholder="Total Kilometers" value={bike.kms} onChange={handleChange} />
        <input name="purchaseDate" type="date" value={bike.purchaseDate} onChange={handleChange} />
        <input name="color" placeholder="Color" value={bike.color} onChange={handleChange} />
        <input name="regNo" placeholder="Registration No." value={bike.regNo} onChange={handleChange} />
        <input name="engineNo" placeholder="Engine No. (Optional)" value={bike.engineNo} onChange={handleChange} />
        <input name="chassisNo" placeholder="Chassis No. (Optional)" value={bike.chassisNo} onChange={handleChange} />
        <button type="submit">Save Bike</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: 20, maxWidth: 500, margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: 10 }
};

export default AddBike;
