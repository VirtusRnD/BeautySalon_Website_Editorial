import React from "react";
import { config } from "../config";
import { FiMapPin, FiPhone, FiClock, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Dynamic font scaling helper
const getDynamicTitleSize = (text = "") => {
  if (!text) return "text-5xl md:text-7xl lg:text-[5.5rem]";
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  if (maxLen >= 12) {
    return "text-3xl md:text-5xl lg:text-6xl";
  } else if (maxLen >= 8) {
    return "text-4xl md:text-6xl lg:text-[5.5rem]";
  }
  return "text-5xl md:text-7xl lg:text-[5.5rem]";
};

const ContactSection = () => {
  const { contact } = config;
  const { t } = useTranslation();

  const infoTexts = t("contact.info", { returnObjects: true }) || [];
  const infoIcons = contact.infoIcons || [];

  const contactTitle = t("contact.title");
  const dynamicTitleClass = getDynamicTitleSize(contactTitle);

  const renderIcon = (id) => {
    switch (id) {
      case "address":
        return <FiMapPin size={24} />;
      case "phone":
        return <FiPhone size={24} />;
      case "hours":
        return <FiClock size={24} />;
      default:
        return null;
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="contact"
      // 👑 FIX: Dropped mobile padding
      className="relative w-full py-12 md:py-40 overflow-hidden bg-editorial-bg text-editorial-text z-0"
    >
      {/* 👑 FIX: Background rectangle sized down heavily on mobile so it doesn't break boundaries */}
      <div className="absolute top-[-5%] right-[-10%] w-64 h-96 md:w-[500px] md:h-[800px] bg-accent-yellow rounded-none mix-blend-multiply opacity-80 rotate-12 -z-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* ==========================================
            LEFT SIDE: EDITORIAL FORM
            ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="w-full lg:w-1/2 flex flex-col z-20"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="w-8 h-[2px] bg-editorial-text" />
            <span className="font-sans text-[10px] md:text-sm font-bold tracking-[0.2em]">
              {toDynamicUpperCase(t("contact.overline"))}
            </span>
          </div>

          <h2
            className={`font-display font-extrabold ${dynamicTitleClass} leading-[0.9] tracking-tighter text-editorial-text mb-6 md:mb-8`}
          >
            {toDynamicUpperCase(contactTitle)}
          </h2>

          <p className="font-sans font-medium text-editorial-text/80 leading-relaxed text-sm md:text-base mb-8 md:mb-12 max-w-md">
            {t("contact.description")}
          </p>

          {/* 👑 FIX: Reduced padding from p-12 to p-6 for small screens */}
          <div className="w-full bg-editorial-text text-ocean-dark p-6 md:p-12 rounded-none shadow-2xl relative">
            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 bg-accent-purple rounded-none -z-10" />

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-6 md:gap-8"
            >
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full">
                <input
                  type="text"
                  placeholder={toDynamicUpperCase(
                    t("contact.form.namePlaceholder"),
                  )}
                  className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark placeholder-ocean-dark/50 py-2 md:py-3 font-display font-bold text-xs md:text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none"
                  required
                />
                <input
                  type="email"
                  placeholder={toDynamicUpperCase(
                    t("contact.form.emailPlaceholder"),
                  )}
                  className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark placeholder-ocean-dark/50 py-2 md:py-3 font-display font-bold text-xs md:text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none"
                  required
                />
              </div>

              <input
                type="text"
                placeholder={toDynamicUpperCase(
                  t("contact.form.servicePlaceholder"),
                )}
                className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark placeholder-ocean-dark/50 py-2 md:py-3 font-display font-bold text-xs md:text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none"
              />

              <textarea
                placeholder={toDynamicUpperCase(
                  t("contact.form.messagePlaceholder"),
                )}
                rows="3"
                className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark placeholder-ocean-dark/50 py-2 md:py-3 font-display font-bold text-xs md:text-sm tracking-widest outline-none resize-none focus:border-ocean-dark transition-colors rounded-none"
                required
              ></textarea>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 md:gap-4 bg-ocean-dark text-editorial-text px-6 py-4 md:px-8 md:py-5 rounded-none font-display font-extrabold text-sm md:text-base tracking-widest hover:bg-accent-yellow hover:text-ocean-dark transition-all duration-300 mt-2 md:mt-4"
              >
                {toDynamicUpperCase(t("contact.form.buttonText"))}
                <FiArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </motion.div>

        {/* ==========================================
            RIGHT SIDE: IMAGE & MASTHEAD INFO
            ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-end z-10 mt-6 lg:mt-0"
        >
          <div className="relative w-[100%] sm:w-[80%] lg:w-[85%] aspect-[4/5] mb-10 md:mb-12">
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-24 h-24 md:w-40 md:h-40 bg-accent-purple rounded-none rotate-12 -z-10 shadow-xl hidden md:block" />

            <div className="w-full h-full rounded-none overflow-hidden border-[6px] md:border-8 border-editorial-text shadow-2xl bg-white">
              <img
                src={contact.imageSrc}
                alt="Contact"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
              />
            </div>
          </div>

          <div className="w-[100%] sm:w-[80%] lg:w-[85%] flex flex-col gap-5 md:gap-6 border-t-[3px] md:border-t-[4px] border-editorial-text pt-6 md:pt-8">
            {infoIcons.map((iconId, index) => (
              <div
                key={index}
                className="flex items-start gap-4 md:gap-6 group"
              >
                <div className="text-accent-yellow group-hover:text-editorial-text transition-colors mt-1">
                  {renderIcon(iconId)}
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg md:text-2xl tracking-tight text-editorial-text">
                    {infoTexts[index]?.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
