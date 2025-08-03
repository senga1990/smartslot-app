import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

// Шлях до файлу з користувачами
const USERS_FILE = path.resolve("users.json");

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  // Дозволяємо тільки POST-запити
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  // Перевірка заповнених полів
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Шукаємо користувача по email
  const users = await readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Перевіряємо пароль
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Якщо логін успішний — повертаємо дані користувача
  res.status(200).json({
    name: user.name,
    email: user.email,
    companyName: user.companyName || null,
    accountType: user.accountType || "standard",
  });
}