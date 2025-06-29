import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.grecaptcha && document.getElementById("recaptcha-container").childNodes.length === 0) {
      window.grecaptcha.render("recaptcha-container", {
        sitekey: "6LdILG8rAAAAAJcUHlEiesgL3HNnhPsUMyxsG0AA",
        callback: () => console.log("✅ CAPTCHA passed"),
      });
    }
  }, []);

  const handleSendCode = async () => {
    setError("");
    try {
      const token = window.grecaptcha.getResponse();
      if (!token) {
        setError("Please complete the CAPTCHA.");
        return;
      }

      await axios.post("http://localhost:4000/send-code", { phone, token });
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send code. Try again.");
    }
  };

  const handleVerifyCode = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:4000/verify-code", {
        phone,
        code: otp,
      });

      if (res.data.valid) {
        alert("✅ Phone verified!");
        navigate("/dashboard");
      } else {
        setError("❌ Invalid code. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Verification failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, color: "white" }}>
      <h2>Sign in with Phone</h2>

      <input
        type="tel"
        placeholder="+1234567890"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <div id="recaptcha-container" style={{ marginBottom: 10 }}></div>

      {!otpSent ? (
        <button onClick={handleSendCode} style={{ width: "100%", padding: 10 }}>
          Send Code
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />
          <button
            onClick={handleVerifyCode}
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          >
            Verify Code
          </button>
        </>
      )}

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
