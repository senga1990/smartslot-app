import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Імпортуємо useTranslation для перекладів

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Використовуємо для перекладів

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const user = res.data;

        login({
          name: user.name,
          email: user.email,
          picture: user.picture,
          provider: "google",
        });

        navigate("/dashboard");
      } catch (err) {
        console.error("❌ Google профіль помилка:", err);
      }
    },
    onError: () => console.error("❌ Google OAuth помилка"),
  });

  return (
    <button onClick={handleLogin} className="btn google-button">
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="google-icon"
      />
      <span>{t("loginWithGoogle", "Login via Google")}</span> {/* Використовуємо переклад */}
    </button>
  );
}
