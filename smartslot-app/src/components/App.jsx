import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Dashboard from './Dashboard';
import PhoneLogin from './PhoneLogin';
import ProtectedRoute from './ProtectedRoute'; // ✅ імпорт

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/phone" element={<PhoneLogin />} />

        {/* ✅ Захищений маршрут */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
