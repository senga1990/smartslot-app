import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = useGoogleLogin({
    scope: "openid profile email",
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const user = res.data;

        login({
          name: user.name,
          email: user.email,
          picture: user.picture,
          provider: "google",
          accountType: "standard",
        });

        navigate("/dashboard");
      } catch (err) {
        console.error("❌ Google profile fetch error:", err);
      }
    },
    onError: (errorResponse) => {
      console.error("❌ Google OAuth error:", errorResponse);
    },
  });

  return (
    <button type="button" onClick={() => handleLogin()} className="btn google-button">
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="google-icon"
      />
      <span>{t("loginWithGoogle", "Login via Google")}</span>
    </button>
  );
}