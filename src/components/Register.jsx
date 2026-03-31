import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/register", { name, email, password });

      if (res.data?.name && res.data?.email) {
        login({
          name: res.data.name,
          email: res.data.email,
          provider: "local",
          accountType: res.data.accountType ?? "standard",
        });

        navigate("/dashboard");
      } else {
        setError(t("serverError") || "Something went wrong.");
      }
    } catch (err) {
      const serverError = err?.response?.data?.error;

      if (serverError === "Email already registered") {
        setError(t("emailExists"));
      } else {
        setError(serverError || t("serverError") || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="welcome-container" style={containerStyle}>
      <h2 style={titleStyle}>{t("register")}</h2>

      {error && <p style={errorStyle}>{error}</p>}

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder={t("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
          disabled={loading}
        />

        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
          disabled={loading}
        />

        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
          disabled={loading}
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? (t("pleaseWait") || "Please wait...") : t("register")}
        </button>
      </form>

      <div style={linksWrapStyle}>
        <Link to="/business-register" style={linkStyle}>
          {t("registerBusiness") || "Register as Business"}
        </Link>

        <p style={textStyle}>
          {t("already")}{" "}
          <Link to="/email-login" style={linkStyle}>
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}

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

const linksWrapStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  textAlign: "center",
  marginTop: "16px",
};

const textStyle = {
  margin: 0,
  color: "#ccc",
};

const linkStyle = {
  color: "#90cdf4",
  textDecoration: "underline",
  fontSize: "14px",
};