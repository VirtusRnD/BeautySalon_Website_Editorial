import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "./locales/en.json";
import trTranslations from "./locales/tr.json";

i18n
  .use(LanguageDetector) // Automatically detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      tr: { translation: trTranslations },
    },
    fallbackLng: "en", // Defaults to English if a language isn't found
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
