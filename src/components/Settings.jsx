import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
  // додаси інші пізніше
];

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { t, i18n } = useTranslation();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [lang, setLang] = useState(i18n.language || "en");

  const isBusiness = (user?.accountType || "standard") === "business";

  useEffect(() => {
    setName(user?.name || "");
    setCompanyName(user?.companyName || "");
    setLang(i18n.language || "en");
  }, [user, i18n.language]);

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser({
      name: name || null,
      companyName: isBusiness ? (companyName || null) : undefined,
      preferredLang: lang,
    });
    i18n.changeLanguage(lang);
    // тут пізніше можна додати toast "Saved"
  };

  return (
    <div style={wrap}>
      <div style={card}>
        <h2 style={title}>{t("settings.title") || "Settings"}</h2>

        <form onSubmit={onSubmit} style={form}>
          <label style={label}>{t("name")}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
            placeholder={t("name")}
          />

          {isBusiness && (
            <>
              <label style={label}>{t("companyName")}</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={input}
                placeholder={t("companyName")}
              />
            </>
          )}

          <label style={label}>{t("settings.interfaceLanguage") || "Interface language"}</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={input}>
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>

          <button className="btn" type="submit" style={{ marginTop: 14 }}>
            {t("settings.save") || "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

const wrap = { minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" };
const card = {
  width: "100%",
  maxWidth: 480,
  padding: 24,
  borderRadius: 16,
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
};
const title = { margin: 0, marginBottom: 16, fontSize: 22, fontWeight: 700 };
const form = { display: "flex", flexDirection: "column", gap: 10 };
const label = { fontSize: 13, opacity: 0.85 };
const input = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  outline: "none",
};
