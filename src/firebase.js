// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOh-xicUXllIKi5QqILmOlVsvfzsQk9Cc",
  authDomain: "petrol-mileage-log-c91cf.firebaseapp.com",
  projectId: "petrol-mileage-log-c91cf",
  storageBucket: "petrol-mileage-log-c91cf.appspot.com",
  messagingSenderId: "601327640435",
  appId: "1:601327640435:web:1c7c60991f0947d0552f06",
  measurementId: "G-EYRTYTCV5T"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
