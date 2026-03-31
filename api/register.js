import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

const BUNDLED_USERS = path.join(process.cwd(), "server", "users.json");
const TMP_USERS = path.join("/tmp", "users.json");

async function ensureTmpSeeded() {
  try {
    await fs.access(TMP_USERS);
  } catch {
    try {
      const data = await fs.readFile(BUNDLED_USERS, "utf8");
      await fs.writeFile(TMP_USERS, data, "utf8");
    } catch (e) {
      console.error("⛔ Не вдалося підготувати /tmp/users.json:", e);
      await fs.writeFile(TMP_USERS, "[]", "utf8");
    }
  }
}

async function readUsers() {
  await ensureTmpSeeded();

  try {
    const data = await fs.readFile(TMP_USERS, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("⛔ Помилка читання /tmp/users.json:", err);
    return [];
  }
}

async function writeUsers(users) {
  try {
    await fs.writeFile(TMP_USERS, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("⛔ Помилка запису /tmp/users.json:", err);
    throw err;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, password } = req.body || {};

  const normalizedName = name?.trim();
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedPassword = password?.trim();

  if (!normalizedName || !normalizedEmail || !normalizedPassword) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });
  }

  if (normalizedPassword.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  const users = await readUsers();

  const existingUser = users.find(
    (u) => u.email?.trim().toLowerCase() === normalizedEmail
  );

  if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(normalizedPassword, 12);

  const newUser = {
    name: normalizedName,
    email: normalizedEmail,
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