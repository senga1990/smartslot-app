import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";

export default function PhoneLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 🔒 Примусово вимикаємо тестовий режим
    auth.settings.appVerificationDisabledForTesting = false;

    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("✅ reCAPTCHA solved");
            },
            "expired-callback": () => {
              console.warn("⚠️ reCAPTCHA expired");
            },
          },
          auth
        );
      } catch (e) {
        console.error("❌ reCAPTCHA init failed:", e);
      }
    }
  }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!phone.startsWith("+1")) {
      return setError("Phone number must start with +1");
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setMessage("✅ Code sent!");
    } catch (err) {
      console.error("❌ SMS sending error:", err);
      setError("Failed to send SMS. Please try again.");

      // Скинути reCAPTCHA при помилці
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  };

  const handleVerifyCode = async () => {
    if (!otp) return setError("Please enter the code");

    try {
      const result = await confirmationResult.confirm(otp);
      setMessage("✅ Verified: " + result.user.phoneNumber);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ OTP verification failed:", err);
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📱 Phone Login</h2>

      <form onSubmit={handleSendCode}>
        <input
          type="text"
          placeholder="+1..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Send Code</button>
        <div id="recaptcha-container"></div>
      </form>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify</button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
