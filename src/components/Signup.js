// src/components/Signup.js import React, { useState } from "react"; import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"; import { doc, setDoc } from "firebase/firestore"; import db from "../firebase";

const Signup = ({ onSignup }) => { const [form, setForm] = useState({ name: "", gender: "", age: "", mobile: "", password: "", bikeCount: "", });

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSignup = async () => { try { const auth = getAuth(); const trimmedMobile = form.mobile.trim(); const email = ${trimmedMobile}@mileage.com; console.log("📧 Creating user with email:", email);

const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
  const uid = userCredential.user.uid;

  console.log("✅ Firebase Auth created. UID:", uid);

  await setDoc(doc(db, "users", uid), {
    ...form,
    uid,
    email,
    createdAt: new Date().toISOString(),
  });

  console.log("✅ Firestore write completed.");

  localStorage.setItem("user", JSON.stringify({ ...form, uid, email }));
  alert(`✅ Signup successful!\nEmail used: ${email}`);
  onSignup();
} catch (error) {
  console.error("❌ Signup error:", error.message);
  alert("Signup error: " + error.message);
}

};

return ( <div style={{ padding: 20 }}> <h2>📝 Signup</h2> <input name="name" id="name" autoComplete="name" placeholder="Name" onChange={handleChange} /><br /> <input name="gender" id="gender" autoComplete="sex" placeholder="Gender" onChange={handleChange} /><br /> <input name="age" id="age" autoComplete="bday" placeholder="Age" type="number" onChange={handleChange} /><br /> <input name="mobile" id="mobile" autoComplete="tel" placeholder="Mobile Number" onChange={handleChange} /><br /> <input name="bikeCount" id="bikeCount" autoComplete="off" placeholder="Number of Bikes" type="number" onChange={handleChange} /><br /> <input name="password" id="password" autoComplete="new-password" placeholder="Password" type="password" onChange={handleChange} /><br /> <button onClick={handleSignup}>Create Account</button> </div> ); };

export default Signup;

