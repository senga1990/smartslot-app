import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={(cred) => {
        const decoded = jwtDecode(cred.credential);
        login({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          provider: "google",
        });
        navigate("/dashboard");
      }}
      onError={() => console.error("Google OAuth Failed")}
      width="100%"
      theme="filled_black"
    />
  );
}
