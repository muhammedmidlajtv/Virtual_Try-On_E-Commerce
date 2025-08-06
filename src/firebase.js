// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq5IrGePa51DNhSx1BG5lZALg1WBt1sEY",
  authDomain: "team2-92046.firebaseapp.com",
  projectId: "team2-92046",
  storageBucket: "team2-92046.appspot.com",
  messagingSenderId: "792358496974",
  appId: "1:792358496974:web:bc3c63c1e3f8d27e413e9f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
