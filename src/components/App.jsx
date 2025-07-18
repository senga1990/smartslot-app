import "../styles/App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import EmailLogin from "./EmailLogin";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";
import { useTranslation } from "react-i18next";

function AppInner() {
  const location = useLocation();
  const { user } = useAuth();
  const { i18n } = useTranslation();

  const isWelcome = location.pathname === "/";

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="app-wrapper">
      {!isWelcome && (
        <header className="lang-switcher-bar">
          <h1 className="text-xl font-bold text-white">SmartSlot</h1>
          <div className="lang-switcher-controls">
            <button onClick={() => changeLang("en")}>🇺🇸</button>
            <button onClick={() => changeLang("uk")}>🇺🇦</button>
            {user && <LogoutButton />}
          </div>
        </header>
      )}

      <main className={isWelcome ? "" : "p-4 flex flex-col items-center gap-6 w-full"}>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/email-login" element={<EmailLogin />} />
          <Route path="/login" element={<EmailLogin />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
