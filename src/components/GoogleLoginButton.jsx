import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("❌ Google Client ID is missing. Check your .env file.");
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
        ⚠️ Помилка: client_id відсутній. Перевір `.env` файл.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
      <GoogleLogin
        onSuccess={(cred) => {
          try {
            const decoded = jwtDecode(cred.credential);
            if (!decoded.email) throw new Error("No email in JWT");
            login({
              name: decoded.name,
              email: decoded.email,
              picture: decoded.picture,
              provider: "google",
            });
            navigate("/dashboard");
          } catch (err) {
            console.error("❌ Помилка при обробці токена Google:", err);
          }
        }}
        onError={() => console.error("❌ Google OAuth Failed")}
        theme="filled_black"
        width="100%"
      />
    </div>
  );
}
