import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

// Абсолютний шлях до users.json
const USERS_FILE = path.join(process.cwd(), "server", "users.json");

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("⛔ Помилка читання users.json:", err);
    return [];
  }
}

async function writeUsers(users) {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("⛔ Помилка запису users.json:", err);
    throw err;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });
  }

  const users = await readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    accountType: "standard",
  };

  users.push(newUser);
  await writeUsers(users);

  return res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    accountType: newUser.accountType,
  });
}
