import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// 🔧 Конфігурація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbd8QBVlJN0qOL30K2XNBsarxiA1iejN4",
  authDomain: "smartslot-app.firebaseapp.com",
  projectId: "smartslot-app",
  storageBucket: "smartslot-app.appspot.com",
  messagingSenderId: "461946962613",
  appId: "1:461946962613:web:e5952578d8aea7482f74fc",
  measurementId: "G-HFZFLH83MF",
};

// 🔥 Ініціалізація Firebase App
const app = initializeApp(firebaseConfig);

// 🔐 Ініціалізація авторизації
export const auth = getAuth(app);

// 🔄 Встановлення локального зберігання (важливо для реального OTP)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("❌ Persistence error:", error);
});

// 🌍 Google Sign-In
export const provider = new GoogleAuthProvider();