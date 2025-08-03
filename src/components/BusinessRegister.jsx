import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function BusinessRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !companyName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Автоматично визначає базовий URL
      const API_URL = `${
        import.meta.env.VITE_API_BASE || ""
      }/api/register-business`;

      const res = await axios.post(API_URL, {
        name,
        companyName,
        email,
        password,
      });

      if (res.data?.email && res.data?.name) {
        login({
          name: res.data.name,
          email: res.data.email,
          companyName: res.data.companyName,
          accountType: "business",
          provider: "local",
        });
        navigate("/dashboard");
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Unable to connect to server.");
      }
    }
  };

  return (
    <div className="welcome-container">
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
        {t("registerBusiness")}
      </h2>

      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder={t("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="btn"
        />
        <input
          type="text"
          placeholder={t("companyName")}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="btn"
        />
        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="btn"
        />
        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="btn"
        />
        <button type="submit" className="google-button">
          {t("register")}
        </button>
      </form>

      <p style={{ marginTop: "1rem", color: "#ccc" }}>
        {t("already")}{" "}
        <span
          onClick={() => navigate("/email-login")}
          style={{ color: "#50c5ff", cursor: "pointer" }}
        >
          {t("login")}
        </span>
      </p>
    </div>
  );
}