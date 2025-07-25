import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/register", { email, password });
      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.error === "Email already registered") {
        setError(t("emailExists"));
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="welcome-container">
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>{t("title")}</h2>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

      <div className="flex flex-col gap-3 mt-4">
        <button className="btn" onClick={() => navigate("/register")}>
          {t("register")}
        </button>
        <button className="btn" onClick={() => navigate("/business-register")}>
          {t("registerBusiness")}
        </button>
      </div>

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
