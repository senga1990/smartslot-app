// src/components/Dashboard.jsx
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

  const derivedName =
    user?.name ?? (user?.email ? user.email.split("@")[0] : "User");

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
          {t("dashboard.welcome", { name: derivedName })}
        </h2>

        {user.email && <p style={emailStyle}>{user.email}</p>}

        <div style={gridStyle}>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Leads</h3>
            <p style={cardTextStyle}>Manage your client leads and statuses.</p>
            <button className="btn" onClick={() => navigate("/leads")}>
              Open Leads
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Estimates</h3>
            <p style={cardTextStyle}>
              Create and track estimates for your clients.
            </p>
            <button className="btn" onClick={() => navigate("/dashboard")}>
              Coming Soon
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Follow-ups</h3>
            <p style={cardTextStyle}>
              Keep track of reminders and pending clients.
            </p>
            <button className="btn" onClick={() => navigate("/dashboard")}>
              Coming Soon
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Settings</h3>
            <p style={cardTextStyle}>
              Update your company details and preferences.
            </p>
            <button className="btn" onClick={() => navigate("/settings")}>
              Open Settings
            </button>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <button className="btn" onClick={handleLogout}>
            {t("dashboard.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}

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
  maxWidth: "900px",
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginTop: "24px",
};

const cardStyle = {
  padding: "20px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  textAlign: "left",
};

const cardTitleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "8px",
};

const cardTextStyle = {
  fontSize: "14px",
  opacity: 0.9,
  marginBottom: "14px",
  lineHeight: 1.5,
};