const fs = require("fs");
const path = require("path");
const { default: translate } = require("@vitalets/google-translate-api"); // ✅ важливо!

const sourceFile = "./src/locales/en.json";
const targetLanguages = [
  "uk", "pl", "fr", "de", "es", "it", "nl",
  "ro", "lt", "hr", "zh", "hi", "be"
];

const en = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));

(async () => {
  for (const lang of targetLanguages) {
    const translated = {};
    for (const key in en) {
      try {
        const res = await translate(en[key], { to: lang });
        translated[key] = res.text;
        console.log(`✅ ${lang} | ${key} → ${res.text}`);
      } catch (err) {
        console.error(`❌ Помилка перекладу ключа ${key} для мови ${lang}: ${err.message}`);
        translated[key] = en[key]; // fallback до англійського, щоб не впав процес
      }
    }

    const outputPath = path.join("./src/locales", `${lang}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2), "utf-8");
    console.log(`📁 Створено файл: ${lang}.json`);
  }
})();
