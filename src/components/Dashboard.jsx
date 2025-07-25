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
        <h2>{t("dashboard.accessDenied")}</h2>
        <button className="btn" onClick={() => navigate("/")}>
          {t("dashboard.goHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      <div className="glass-box">
        <h1 className="logo-text">SmartSlot</h1>
        <p className="email">{user.email}</p>
        <h2>{t("dashboard.welcome")}</h2>
        <button className="btn" onClick={handleLogout}>
          {t("dashboard.logout")}
        </button>
      </div>
    </div>
  );
}
