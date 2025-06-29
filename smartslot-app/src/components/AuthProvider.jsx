// src/components/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// 🔐 Створюємо контекст
const AuthContext = createContext(null);

// 📦 Провайдер, що слідкує за змінами авторизації
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Хук, щоб зручно отримувати користувача
export const useAuth = () => useContext(AuthContext);
