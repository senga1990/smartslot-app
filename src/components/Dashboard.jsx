import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="welcome-container">
        <h2 style={headingStyle}>{t("dashboard.accessDenied")}</h2>
        <button className="btn" onClick={() => navigate("/")}>
          {t("dashboard.goHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="welcome-container" style={containerStyle}>
      <div className="glass-box" style={glassStyle}>
        <h2 style={headingStyle}>
          {t("dashboard.welcome")}, {user.name || user.email}!
        </h2>
        <p style={emailStyle}>{user.email}</p>
        <button className="btn" onClick={handleLogout}>
          {t("dashboard.logout")}
        </button>
      </div>
    </div>
  );
}

// 🔽 Інлайн-стилі
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
};

const glassStyle = {
  padding: "32px",
  borderRadius: "16px",
  backdropFilter: "blur(18px)",
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
  maxWidth: "360px",
  width: "100%",
  color: "white",
};

const headingStyle = {
  fontSize: "24px",
  marginBottom: "12px",
  fontWeight: "600",
  textShadow: "0 0 6px rgba(0, 0, 0, 0.6)",
};

const emailStyle = {
  fontSize: "14px",
  marginBottom: "24px",
  opacity: 0.85,
  wordBreak: "break-all",
};