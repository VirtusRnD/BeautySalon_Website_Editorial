import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Drastically scaled down mobile and tablet (md) font sizes
const getDynamicMenuSize = (text = "") => {
  if (!text) return "text-xl md:text-3xl"; // fallback
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  if (maxLen >= 12) {
    return "text-lg md:text-2xl";
  } else if (maxLen >= 8) {
    return "text-xl md:text-3xl";
  }

  // Default for shorter words
  return "text-2xl md:text-4xl";
};

const Navbar = () => {
  const { t } = useTranslation();
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  const scrollToSection = (sectionId) => {
    if (nav) setNav(false);
    setActiveSection(sectionId);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = t("navbar.links", { returnObjects: true }) || [];

  const navBgClass = scrolled
    ? "bg-editorial-text border-b-[3px] border-ocean-dark shadow-md py-3"
    : "bg-transparent border-b-[3px] border-transparent py-4";

  const navTextClass = scrolled ? "text-ocean-dark" : "text-editorial-text";

  return (
    <>
      {/* ==========================================
          DESKTOP NAVBAR
          ========================================== */}
      <div className="fixed top-0 left-0 w-full z-[100] transition-all duration-500">
        <div
          className={`w-full transition-all duration-500 ${navBgClass} px-4 lg:px-12 flex justify-between items-center gap-4`}
        >
          <div
            onClick={() => scrollToSection("home")}
            className={`font-display font-extrabold text-base md:text-xl whitespace-nowrap cursor-pointer select-none tracking-tighter ${navTextClass} transition-colors duration-500`}
          >
            {toDynamicUpperCase(t("navbar.logo"))}
          </div>

          {/* DESKTOP MENU LINKS */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`font-display font-bold text-[10px] xl:text-xs tracking-[0.2em] transition-all duration-300 relative group whitespace-nowrap ${navTextClass}`}
                >
                  {toDynamicUpperCase(item.label)}
                  <span
                    className={`absolute -bottom-2 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full ${activeSection === item.id ? "w-full" : ""}`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* DESKTOP RIGHT BUTTONS */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            <LanguageSwitcher textColorClass={navTextClass} />

            <div className="w-[2px] h-4 bg-current opacity-20" />

            <div className="flex items-center gap-4">
              <button
                className={`font-display font-bold text-[10px] xl:text-xs tracking-[0.2em] hover:text-accent-yellow transition-colors whitespace-nowrap ${navTextClass}`}
              >
                {toDynamicUpperCase(t("navbar.signInText"))}
              </button>

              <button
                className={`font-display font-bold text-[10px] xl:text-xs tracking-[0.2em] whitespace-nowrap px-4 py-2 border-2 transition-colors duration-300 
                ${
                  scrolled
                    ? "border-ocean-dark text-ocean-dark hover:bg-ocean-dark hover:text-editorial-text"
                    : "border-editorial-text text-editorial-text hover:bg-editorial-text hover:text-ocean-dark"
                }`}
              >
                {toDynamicUpperCase(t("navbar.signUpText"))}
              </button>
            </div>
          </div>

          {/* MOBILE HAMBURGER ICON */}
          <div className="flex lg:hidden items-center gap-4">
            <LanguageSwitcher textColorClass={navTextClass} />
            <button
              onClick={handleNav}
              className={`${navTextClass} p-1 focus:outline-none transition-colors duration-500`}
            >
              <AiOutlineMenu size={22} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          MOBILE MENU
          ========================================== */}
      <div
        onClick={handleNav}
        className={`fixed inset-0 w-full h-full bg-ocean-dark/80 backdrop-blur-sm z-[140] transition-opacity duration-300 ${
          nav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 👑 FIX: Significantly reduced width for mobile (w-[85%], max-w-[320px]) */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85%] sm:w-[60%] max-w-[320px] bg-editorial-bg border-l-[4px] md:border-l-[6px] border-ocean-dark z-[150] shadow-2xl flex flex-col p-5 md:p-8 transition-transform duration-500 ease-[0.22,1,0.36,1] ${
          nav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8 border-b-[3px] border-ocean-dark/20 pb-4">
          <div className="font-display font-extrabold text-lg md:text-xl text-editorial-text tracking-tighter whitespace-nowrap">
            {toDynamicUpperCase(t("navbar.logo"))}
          </div>
          <button
            onClick={handleNav}
            className="text-editorial-text hover:text-accent-yellow transition-colors"
          >
            <AiOutlineClose size={22} />
          </button>
        </div>

        <ul className="flex flex-col gap-3 md:gap-4 flex-grow overflow-y-auto">
          {navLinks.map((item) => {
            const dynamicSize = getDynamicMenuSize(item.label);

            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`font-display font-extrabold ${dynamicSize} tracking-tighter transition-colors text-left w-full leading-[1.1] py-2 ${
                    activeSection === item.id
                      ? "text-accent-yellow"
                      : "text-editorial-text hover:text-accent-yellow"
                  }`}
                >
                  {toDynamicUpperCase(item.label)}
                </button>
              </li>
            );
          })}
        </ul>

        {/* MOBILE BUTTONS */}
        <div className="flex flex-col gap-3 mt-4 border-t-[3px] border-ocean-dark/20 pt-6">
          <button className="w-full font-display font-bold text-[10px] md:text-xs tracking-widest py-3 md:py-4 border-[3px] border-editorial-text text-editorial-text hover:bg-editorial-text hover:text-ocean-dark transition-colors">
            {toDynamicUpperCase(t("navbar.signInText"))}
          </button>
          <button className="w-full font-display font-bold text-[10px] md:text-xs tracking-widest py-3 md:py-4 bg-ocean-dark text-editorial-text border-[3px] border-ocean-dark hover:bg-accent-yellow hover:text-ocean-dark transition-colors">
            {toDynamicUpperCase(t("navbar.signUpText"))}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
