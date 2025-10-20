import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

// Шлях до users.json у /server
const USERS_FILE = path.join(process.cwd(), "server", "users.json");

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("⛔ Не вдалося прочитати users.json:", err);
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const users = await readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.status(200).json({
    name: user.name,
    email: user.email,
    companyName: user.companyName || null,
    accountType: user.accountType || "standard",
  });
}
