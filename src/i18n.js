// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Локалі (якщо bundle стане важким — легко перейти на lazy-load)
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
import zh from "./locales/zh.json"; // китайська
import hi from "./locales/hi.json"; // гінді
import be from "./locales/be.json"; // білоруська

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

    // Базова мова + жорсткий список підтримуваних,
    // щоб детектор не підхоплював дивні варіанти типу "en-US-x-auto"
    fallbackLng: "en",
    supportedLngs: ["en","uk","pl","fr","de","it","es","nl","ro","lt","hr","zh","hi","be"],

    // Щоб ключі не ламались через крапки в назвах
    keySeparator: false,

    interpolation: { escapeValue: false },

    // Якщо в локалі ключа немає або він порожній — не показувати null/""; візьме фолбек
    returnNull: false,
    returnEmptyString: false,

    // Детектор мов: спершу localStorage, потім браузер
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },

    // Реактові опції (без Suspense — зручно для CSR)
    react: { useSuspense: false },

    // Корисно під час розробки: логувати відсутні ключі у консоль
    saveMissing: true,
    missingKeyHandler: function (lng, ns, key) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing key: ${key} (lng=${lng}, ns=${ns})`);
      }
    },
  });

export default i18n;
