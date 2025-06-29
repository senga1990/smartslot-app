const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Надсилання OTP
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });
    res.status(200).json({ success: true, status: verification.status });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Перевірка OTP
app.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const check = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });
    res.status(200).json({ success: true, status: check.status, valid: check.valid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Запуск сервера
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
