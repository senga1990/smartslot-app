import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const languages = {
  en: { label: "🇺🇸", name: "English" },
  uk: { label: "🇺🇦", name: "Українська" },
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const currentLang = i18n.language || "en";

  // ✅ Встановлення мови з localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== currentLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [currentLang, i18n]);

  const toggle = () => setOpen(!open);

  const switchTo = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Мови відображаються в рядку внизу */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          gap: "8px",
        }}
      >
        {Object.entries(languages).map(([code, { label }]) => (
          <button
            key={code}
            onClick={() => switchTo(code)}
            disabled={code === currentLang}
            className={`w-full px-2 py-1 text-sm hover:bg-gray-100 ${
              code === currentLang ? "opacity-50 cursor-default" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
