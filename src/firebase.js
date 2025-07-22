// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your new Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAOh-xicUXllIKi5QqILmOlVsvfzsQk9Cc",
  authDomain: "petrol-mileage-log-c91cf.firebaseapp.com",
  projectId: "petrol-mileage-log-c91cf",
  storageBucket: "petrol-mileage-log-c91cf.appspot.com", // fixed `.app` to `.com`
  messagingSenderId: "601327640435",
  appId: "1:601327640435:web:1c7c60991f0947d0552f06",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
