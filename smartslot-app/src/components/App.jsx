import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Dashboard from './Dashboard'; // ✅ вже був
import PhoneLogin from './PhoneLogin'; // ✅ додано

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/phone" element={<PhoneLogin />} /> {/* ✅ маршрут для реєстрації по телефону */}
      </Routes>
    </Router>
  );
}

export default App;
