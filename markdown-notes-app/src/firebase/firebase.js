// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection   } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn8Kav18c6cRWYIRetSge5mEklc76hCWA",
  authDomain: "react-notes-f6208.firebaseapp.com",
  projectId: "react-notes-f6208",
  storageBucket: "react-notes-f6208.appspot.com",
  messagingSenderId: "558126713189",
  appId: "1:558126713189:web:d2fa4d505178dd1950798c",
  measurementId: "G-6079RNNY4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")