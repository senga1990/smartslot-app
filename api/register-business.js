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

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export default async function handler(req, res) {
  // Дозволяємо тільки POST-запити
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, companyName, email, password } = req.body;

  // Перевірка заповнених полів
  if (!name || !companyName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Перевірка, чи немає такого email
  const users = await readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already registered" });
  }

  // Хешування паролю
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    name,
    companyName,
    email,
    password: hashedPassword,
    accountType: "business",
  };

  users.push(newUser);
  await writeUsers(users);

  // Відповідь з підтвердженням
  res.status(201).json({ name, email, companyName });
}