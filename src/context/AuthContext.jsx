// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const LS_KEY = "smartslot.user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // коли контекст ініціалізовано

  // 1) Ініціалізація з localStorage (безпечний парс)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.warn("Auth init parse failed:", e);
    } finally {
      setReady(true);
    }
  }, []);

  // 2) Синхронізація в localStorage
  useEffect(() => {
    try {
      if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
      else localStorage.removeItem(LS_KEY);
    } catch (e) {
      console.warn("Auth persist failed:", e);
    }
  }, [user]);

  // 3) Публічне API
  // login очікує: { email, name?, provider?, accountType?, companyName?, preferredLang? }
  const login = (userData) => {
    if (userData && userData.email) setUser(userData);
  };

  const logout = () => setUser(null);

  // ✅ часткове оновлення профілю (для Settings)
  const updateUser = (patch) => {
    setUser((prev) => ({ ...(prev || {}), ...(patch || {}) }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
