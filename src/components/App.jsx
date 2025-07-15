import "../styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import GoogleLoginButton from "./GoogleLoginButton";
import EmailLogin from "./EmailLogin";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LogoutButton from "./LogoutButton";

function App() {
  return (
    <Router>
      <header className="flex justify-between items-center p-4 shadow-md bg-white">
        <h1 className="text-xl font-bold text-gray-800">SmartSlot</h1>
        <LogoutButton />
      </header>

      <main className="p-4 flex flex-col items-center gap-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <WelcomeScreen />
                <GoogleLoginButton />
                <EmailLogin />
              </>
            }
          />
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
    </Router>
  );
}

export default App;
