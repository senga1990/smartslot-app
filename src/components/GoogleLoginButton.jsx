import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
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
        width="280"
        theme="filled_black"
      />
    </div>
  );
}
