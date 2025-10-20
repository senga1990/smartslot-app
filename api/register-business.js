import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

// Базові шляхи
const BUNDLED_USERS = path.join(process.cwd(), "server", "users.json"); // read-only
const TMP_USERS = path.join("/tmp", "users.json");                      // read/write (ефемерно)

async function ensureTmpSeeded() {
  // якщо /tmp/users.json відсутній — скопіюємо його з бандла
  try {
    await fs.access(TMP_USERS);
  } catch {
    try {
      const data = await fs.readFile(BUNDLED_USERS, "utf8");
      await fs.writeFile(TMP_USERS, data, "utf8");
    } catch (e) {
      console.error("⛔ Не вдалося підготувати /tmp/users.json:", e);
      // якщо навіть прочитати бандл не вдалось — ініціюємо пустим масивом
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

  if (!name || !companyName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const users = await readUsers();

    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ error: "Email already registered" });
    }

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
