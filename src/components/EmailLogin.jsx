import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login або register
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint =
        mode === "login" ? "/api/login" : "/api/register"; // ✅ Vercel API route
      const res = await axios.post(endpoint, { email, password });

      // ✅ Якщо логін/реєстрація успішна
      if (res.data?.email) {
        login({
          email: res.data.email,
          provider: "local",
        });
        navigate("/dashboard");
      } else {
        setError(t("serverError"));
      }
    } catch (err) {
      const message = err.response?.data?.error || t("serverError");
      console.error("⛔ Login/Register error:", message);
      setError(message);
    }
  };

  return (
    <div className="welcome-container" style={containerStyle}>
      <h2 style={titleStyle}>
        {mode === "login" ? t("loginWithEmail") : t("registerWithEmail")}
      </h2>

      {error && <p style={errorStyle}>{error}</p>}

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" className="btn">
          {mode === "login" ? t("login") : t("register")}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
          style={toggleBtnStyle}
        >
          {mode === "login"
            ? t("newUserRegister")
            : t("alreadyRegisteredLogin")}
        </button>
      </div>
    </div>
  );
}

// 🔽 Стилі
const containerStyle = {
  maxWidth: "360px",
  width: "100%",
  padding: "24px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  backdropFilter: "blur(16px)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
  color: "white",
  zIndex: 10,
};

const titleStyle = {
  fontSize: "22px",
  marginBottom: "16px",
  fontWeight: "600",
};

const errorStyle = {
  color: "#ff6666",
  marginBottom: "12px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  backdropFilter: "blur(8px)",
  outline: "none",
};

const toggleBtnStyle = {
  background: "none",
  border: "none",
  color: "#90cdf4",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "14px",
};