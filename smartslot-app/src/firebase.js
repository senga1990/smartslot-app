import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// 🔑 Конфігурація Firebase з нового проєкту (smartslot-clean)
const firebaseConfig = {
  apiKey: "AIzaSyBbd8QBVJ1N8qQL30K2XNBsarxiA1iejN4",
  authDomain: "smartslot-app.firebaseapp.com",
  projectId: "smartslot-app",
  storageBucket: "smartslot-app.appspot.com",
  messagingSenderId: "461946962613",
  appId: "1:461946962613:web:9b40096f23bddb42f74fc",
  measurementId: "G-G2WMK4BX0W",
};

// 🚀 Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Авторизація
export const auth = getAuth(app);

// 🧠 Google Sign-In провайдер
export const googleProvider = new GoogleAuthProvider();

// 💾 Постійна авторизація в браузері
setPersistence(auth, browserLocalPersistence);

export default app;
