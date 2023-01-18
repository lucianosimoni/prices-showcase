// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmL00GjK4ITdZCSA3JouBuLy5saQzI6NQ",
  authDomain: "prices-showcase.firebaseapp.com",
  databaseURL:
    "https://prices-showcase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prices-showcase",
  storageBucket: "prices-showcase.appspot.com",
  messagingSenderId: "343227628906",
  appId: "1:343227628906:web:40961511c79670a07d3913",
  measurementId: "G-5KB64C8T33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Realtime-database
export const database = getDatabase();

// Storage
export const storage = getStorage(app);
