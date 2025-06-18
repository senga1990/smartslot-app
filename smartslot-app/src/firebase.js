// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbd8QBVlJN0qOL30K2XNBsarxiA1iejN4",
  authDomain: "smartslot-app.firebaseapp.com",
  projectId: "smartslot-app",
  storageBucket: "smartslot-app.appspot.com",
  messagingSenderId: "461946962613",
  appId: "1:461946962613:web:e5952578d8aea7482f74fc",
  measurementId: "G-HFZFLH83MF"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Авторизація
export const auth = getAuth(app);

// Google Provider
export const provider = new GoogleAuthProvider();
