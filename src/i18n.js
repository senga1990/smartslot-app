import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ✅ Імпортуємо всі локалізації
import en from "./locales/en.json";
import uk from "./locales/uk.json";
import pl from "./locales/pl.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import es from "./locales/es.json";
import nl from "./locales/nl.json";
import ro from "./locales/ro.json";
import lt from "./locales/lt.json";
import hr from "./locales/hr.json";
import zh from "./locales/zh.json";
import hi from "./locales/hi.json";
import be from "./locales/be.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
      pl: { translation: pl },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      es: { translation: es },
      nl: { translation: nl },
      ro: { translation: ro },
      lt: { translation: lt },
      hr: { translation: hr },
      zh: { translation: zh },
      hi: { translation: hi },
      be: { translation: be },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
