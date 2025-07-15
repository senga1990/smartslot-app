import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = path.resolve("users.json");

// 📝 REGISTER
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const users = await readUsers();
  if (users.find((u) => u.email === email))
    return res.status(409).json({ error: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 12);
  users.push({ email, password: hashedPassword });
  await writeUsers(users);

  res.status(201).json({ email });
});

// 🔐 LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await readUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  res.json({ email });
});

// 🔧 HELPERS
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

// 🚀 START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
