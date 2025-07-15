import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // або "register"
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
    <div className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {mode === "login" ? "Login" : "Register"}
      </h2>
      {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <div className="text-center mt-3">
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="text-sm text-blue-500 underline"
        >
          {mode === "login" ? "New user? Register" : "Already registered? Login"}
        </button>
      </div>
    </div>
  );
}
