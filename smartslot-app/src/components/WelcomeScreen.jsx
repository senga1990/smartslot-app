import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handlePhoneLogin = () => navigate('/phone');

  return (
    <div className="welcome-container">
      <div className="logo-glow"></div>

      <motion.img
        src="/logo.png"
        alt="Logo"
        className="logo-image"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="logo-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1>SmartSlot</h1>
        <p>AI‑powered slot optimization</p>
      </motion.div>

      <motion.div
        className="button-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <button className="btn" onClick={handleLogin}>Login</button>
        <button className="btn" onClick={handleRegister}>Register</button>
        <button className="btn btn-secondary" onClick={handlePhoneLogin}>
          Phone Login
        </button>
      </motion.div>

      <motion.button
        className="explore-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        Explore Demo ⬎
      </motion.button>
    </div>
  );
}
