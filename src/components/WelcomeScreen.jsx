import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import "../styles/WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* розмитий сяйнистий круг */}
      <div className="logo-glow"></div>

      {/* логотип із плавним підстрибуванням */}
      <motion.img
        src="/logo.png"
        alt="SmartSlot logo"
        className="logo-image"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* назва та підзаголовок */}
      <motion.div
        className="logo-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <h1>SmartSlot</h1>
        <p>AI-powered slot optimization</p>
      </motion.div>

      {/* група головних кнопок */}
      <motion.div
        className="button-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <button className="btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn" onClick={() => navigate("/register")}>
          Register
        </button>
        <button className="btn" onClick={() => navigate("/phone")}>
          Phone Login
        </button>

        {/* Google OAuth — у тому ж блоці */}
        <GoogleLoginButton />
      </motion.div>

      {/* окрема кнопка-посилання на демо */}
      <motion.button
        className="explore-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={() => navigate("/demo")}
      >
        Explore Demo
      </motion.button>
    </div>
  );
}
