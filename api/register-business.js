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
    console.error("⛔ Помилка читання users.json з /tmp:", err);
    return [];
  }
}

async function writeUsers(users) {
  try {
    await fs.writeFile(TMP_USERS, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("⛔ Помилка запису users.json у /tmp:", err);
    throw err;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, companyName, email, password } = req.body || {};

  const normalizedName = name?.trim();
  const normalizedCompanyName = companyName?.trim();
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedPassword = password?.trim();

  if (
    !normalizedName ||
    !normalizedCompanyName ||
    !normalizedEmail ||
    !normalizedPassword
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (normalizedPassword.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
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
      companyName: normalizedCompanyName,
      email: normalizedEmail,
      password: hashedPassword,
      accountType: "business",
    };

    users.push(newUser);
    await writeUsers(users);

    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      companyName: newUser.companyName,
      accountType: newUser.accountType,
    });
  } catch (e) {
    console.error("⛔ register-business failed:", e);
    return res.status(500).json({ error: "Server error" });
  }
}