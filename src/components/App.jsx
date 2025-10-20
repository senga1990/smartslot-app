// src/components/App.jsx
import "../styles/App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import EmailLogin from "./EmailLogin";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LogoutButton from "./LogoutButton";
import { useAuth, AuthProvider } from "../context/AuthContext";
import Register from "./Register";
import BusinessRegister from "./BusinessRegister";
import LanguageSwitcher from "./LanguageSwitcher";
import Settings from "./Settings";                // ✅ ДОДАНО
import "../i18n";

function AppInner() {
  const location = useLocation();
  const { user, ready } = useAuth();
  const isWelcome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  if (!ready) return null;

  return (
    <div className="app-wrapper">
      {!isWelcome && (
        <header className="lang-switcher-bar">
          <h1 className="text-xl font-bold text-white">SmartSlot</h1>
          <div className="lang-switcher-controls">
            <LanguageSwitcher />
            {user && !isDashboard && <LogoutButton />}
          </div>
        </header>
      )}

      <main className={isWelcome ? "" : "p-4 flex flex-col items-center gap-6 w-full"}>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/email-login" element={<EmailLogin />} />
          <Route path="/login" element={<EmailLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/business-register" element={<BusinessRegister />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"                            // ✅ ДОДАНО
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {isWelcome && <LanguageSwitcher />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </Router>
  );
}
