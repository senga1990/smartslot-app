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
    console.error("⛔ Не вдалося прочитати /tmp/users.json:", err);
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body || {};

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedPassword = password?.trim();

  if (!normalizedEmail || !normalizedPassword) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const users = await readUsers();

  const user = users.find(
    (u) => u.email?.trim().toLowerCase() === normalizedEmail
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(normalizedPassword, user.password);
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