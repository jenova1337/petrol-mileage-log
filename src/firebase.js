// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Firebase configuration (use your actual Firebase config here)
const firebaseConfig = {
  apiKey: "AIzaSyDJXTUS8xTqOxOw9Hi6R2_egFL2ZrQBYjQ",
  authDomain: "petrol-mileage-log.firebaseapp.com",
  projectId: "petrol-mileage-log",
  storageBucket: "petrol-mileage-log.appspot.com",
  messagingSenderId: "429354131544",
  appId: "1:429354131544:web:4598917e716345aa602a2d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
