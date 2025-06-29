const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app.post("/send-code", async (req, res) => {
  const { phone } = req.body;

  try {
    await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({ to: phone, channel: "sms" });

    res.status(200).json({ message: "Code sent" });
  } catch (err) {
    console.error("Send code error:", err.message);
    res.status(500).json({ error: "Failed to send code" });
  }
});

app.post("/verify-code", async (req, res) => {
  const { phone, code } = req.body;

  try {
    const result = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: phone, code });

    if (result.status === "approved") {
      res.status(200).json({ valid: true });
    } else {
      res.status(401).json({ valid: false });
    }
  } catch (err) {
    console.error("Verify code error:", err.message);
    res.status(500).json({ error: "Verification failed" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
іі