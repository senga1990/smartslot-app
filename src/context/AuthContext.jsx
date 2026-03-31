// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const LS_KEY = "smartslot.user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

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

  useEffect(() => {
    try {
      if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
      else localStorage.removeItem(LS_KEY);
    } catch (e) {
      console.warn("Auth persist failed:", e);
    }
  }, [user]);

  const login = (userData) => {
    if (userData && userData.email) {
      setUser(userData);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (patch) => {
    setUser((prev) => ({ ...(prev || {}), ...(patch || {}) }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}