import "../styles/App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import EmailLogin from "./EmailLogin";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";
import BusinessRegister from "./BusinessRegister"; // ⬅️ додано
import LanguageSwitcher from "./LanguageSwitcher";

function AppInner() {
  const location = useLocation();
  const { user } = useAuth();
  const isWelcome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="app-wrapper">
      {/* ✅ Хедер тільки на внутрішніх сторінках (крім Welcome) */}
      {!isWelcome && (
        <header className="lang-switcher-bar">
          <h1 className="text-xl font-bold text-white">SmartSlot</h1>
          <div className="lang-switcher-controls">
            <LanguageSwitcher />
            {/* ✅ Показувати Logout лише якщо користувач є і НЕ на Dashboard */}
            {user && !isDashboard && <LogoutButton />}
          </div>
        </header>
      )}

      {/* ✅ Основний контент */}
      <main className={isWelcome ? "" : "p-4 flex flex-col items-center gap-6 w-full"}>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/email-login" element={<EmailLogin />} />
          <Route path="/login" element={<EmailLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/business-register" element={<BusinessRegister />} /> {/* ⬅️ новий маршрут */}
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

      {/* ✅ Перемикач мови на Welcome екрані — у верхньому правому куті */}
      {isWelcome && <LanguageSwitcher />}
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
