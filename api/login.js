// /api/login.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // 🔐 Імітація входу
  console.log("🔑 Login request for:", email);

  // Тут можна перевіряти збереженого користувача
  return res.status(200).json({ email });
}
