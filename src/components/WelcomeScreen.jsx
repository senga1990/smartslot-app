import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "./GoogleLoginButton";
import LanguageSwitcher from "./LanguageSwitcher";
import "../styles/WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="welcome-container">
      {/* 🌐 Language button (вгорі зліва) */}
      <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 50 }}>
        <LanguageSwitcher />
      </div>

      {/* 🔆 Logo glow effect */}
      <div className="logo-glow"></div>

      {/* 🧠 Logo image */}
      <motion.img
        src="/logo.png"
        alt="SmartSlot logo"
        className="logo-image mx-auto mb-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🧠 Slogan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <p className="ai-powered-text mt-2">
          {t("slogan", "AI-powered slot optimization")}
        </p>
      </motion.div>

      {/* 🔐 Login buttons */}
      <motion.div
        className="flex flex-col items-center gap-3 mt-6 w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <button
          className="google-button"
          onClick={() => navigate("/email-login")}
        >
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/new-post.png"
            alt="email"
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          {t("loginWithEmail", "Login via Email")}
        </button>

        {/* Передаємо текст для кнопки Google */}
        <GoogleLoginButton text={t("loginWithGoogle", "Login via Google")} />
      </motion.div>

      {/* 🔍 Explore demo */}
      <motion.button
        className="explore-btn mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={() => navigate("/demo")}
      >
        {t("exploreDemo", "Explore Demo")}
      </motion.button>
    </div>
  );
}
