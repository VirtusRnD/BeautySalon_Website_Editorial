import React from "react";
import { useTranslation } from "react-i18next";

// 👑 Added textColorClass prop with a default fallback
const LanguageSwitcher = ({ textColorClass = "text-white" }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const isTurkish = currentLang.toLowerCase().startsWith("tr");

  const toggleLanguage = () => {
    const nextLang = isTurkish ? "en" : "tr";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      // 👑 Now correctly uses textColorClass instead of hardcoded white!
      className={`text-xs tracking-[0.2em] py-[0.1em] uppercase font-bold transition-colors duration-300 cursor-pointer ${textColorClass} hover:text-accent-yellow`}
      aria-label="Language Switcher"
    >
      {isTurkish ? "TR" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
