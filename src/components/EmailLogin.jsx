import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/${mode}`, { email, password });
      login({ email: res.data.email, provider: "local" });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
    }
  };

  return (
    <div
      className="welcome-container"
      style={{
        maxWidth: "360px",
        width: "100%",
        padding: "24px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
        color: "white",
        zIndex: 10,
      }}
    >
      <h2 style={{ fontSize: "22px", marginBottom: "16px", fontWeight: "600" }}>
        {mode === "login" ? "Увійти через Email" : "Зареєструватися"}
      </h2>

      {error && (
        <p style={{ color: "#ff6666", marginBottom: "12px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            backdropFilter: "blur(8px)",
            outline: "none",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            backdropFilter: "blur(8px)",
            outline: "none",
          }}
        />
        <button type="submit" className="btn">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          style={{
            background: "none",
            border: "none",
            color: "#90cdf4",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {mode === "login" ? "New user? Register" : "Already registered? Login"}
        </button>
      </div>
    </div>
  );
}
