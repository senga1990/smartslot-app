import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "./GoogleLoginButton";
import "../styles/WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="welcome-container">
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
        <p className="ai-powered-text mt-2">{t("slogan")}</p>
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
            className="icon"
          />
          {t("loginWithEmail")}
        </button>

        <GoogleLoginButton text={t("loginWithGoogle")} />
      </motion.div>

      {/* 🔍 Explore demo */}
      <motion.button
        className="explore-btn mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={() => navigate("/demo")}
      >
        {t("exploreDemo")}
      </motion.button>

      {/* 📝 Register (User) */}
      <motion.button
        className="google-button mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        onClick={() => navigate("/register")}
      >
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/add-user-male.png"
          alt="register"
          className="icon"
        />
        {t("register")}
      </motion.button>

      {/* 🏢 Register (Business) */}
      <motion.button
        className="google-button mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        onClick={() => navigate("/business-register")}
      >
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/company.png"
          alt="business"
          className="icon"
        />
        {t("registerBusiness")}
      </motion.button>
    </div>
  );
}
