import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";

// Повний список мов
const allLanguages = {
  en: { label: "🇺🇸", name: "English" },
  uk: { label: "🇺🇦", name: "Українська" },
  es: { label: "🇪🇸", name: "Español" },
  fr: { label: "🇫🇷", name: "Français" },
  it: { label: "🇮🇹", name: "Italiano" },
  pl: { label: "🇵🇱", name: "Polski" },
  de: { label: "🇩🇪", name: "Deutsch" },
  nl: { label: "🇳🇱", name: "Nederlands" },
  ro: { label: "🇷🇴", name: "Română" },
  lt: { label: "🇱🇹", name: "Lietuvių" },
  hr: { label: "🇭🇷", name: "Hrvatski" },
  zh: { label: "🇨🇳", name: "中文" },
  hi: { label: "🇮🇳", name: "हिन्दी" },
  be: { label: "🇧🇾", name: "Беларуская" },
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLang = i18n.resolvedLanguage || i18n.language || "en";

  const availableLanguages = Object.keys(i18n.options.resources || {}).reduce((acc, code) => {
    if (allLanguages[code]) {
      acc[code] = allLanguages[code];
    }
    return acc;
  }, {});

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== i18n.language && availableLanguages[storedLang]) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n, availableLanguages]);

  const switchTo = useCallback((lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setOpen(false);
  }, [i18n]);

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          className="btn"
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            borderRadius: "10px",
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid white",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          🌍 {allLanguages[currentLang]?.name}
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              maxHeight: "300px",
              overflowY: "auto",
              background: "rgba(0,0,0,0.9)",
              border: "1px solid white",
              borderRadius: "10px",
              padding: "8px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "180px",
            }}
          >
            {Object.entries(availableLanguages).map(([code, { label, name }]) => (
              <button
                key={code}
                onClick={() => switchTo(code)}
                disabled={code === currentLang}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  padding: "8px 12px",
                  fontSize: "15px",
                  cursor: code === currentLang ? "default" : "pointer",
                  opacity: code === currentLang ? 0.5 : 1,
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {label} {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
