import React, { useState } from "react";
import { config } from "../config";
import { FiArrowRight, FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Scaled down mobile bounds to text-2xl and text-3xl to ensure ultra-long strings fit
const getDynamicTitleSize = (text = "") => {
  if (!text) return "text-3xl md:text-5xl lg:text-7xl";
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  if (maxLen >= 12) {
    return "text-2xl sm:text-3xl md:text-5xl lg:text-6xl";
  } else if (maxLen >= 8) {
    return "text-3xl sm:text-4xl md:text-5xl lg:text-[4rem]";
  }
  return "text-3xl sm:text-4xl md:text-6xl lg:text-7xl";
};

const AboutUs = () => {
  const { aboutUs } = config;
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const paragraphs = t("aboutUs.paragraphs", { returnObjects: true }) || [];
  const stats = t("aboutUs.expanded.stats", { returnObjects: true }) || [];

  const aboutTitle = t("aboutUs.title");
  const dynamicTitleClass = getDynamicTitleSize(aboutTitle);

  return (
    <section
      id="about"
      // 👑 FIX: Py tightened down to py-10 for mobile
      className="relative w-full py-10 md:py-32 overflow-hidden bg-editorial-text text-ocean-dark"
    >
      {/* 👑 FIX: gap-10 reduced to gap-8 for mobile flow */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
        {/* ==========================================
            LEFT SIDE: EDITORIAL TYPOGRAPHY
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 flex flex-col items-start text-left"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="w-6 md:w-8 h-[2px] bg-accent-yellow" />
            <span className="font-sans text-[10px] md:text-sm font-bold tracking-[0.2em]">
              {toDynamicUpperCase(t("aboutUs.overline"))}
            </span>
          </div>

          <h2
            className={`font-display font-extrabold ${dynamicTitleClass} leading-[1] text-ocean-dark mb-5 md:mb-8 tracking-tighter`}
          >
            {toDynamicUpperCase(aboutTitle)}
          </h2>

          <div className="flex flex-col gap-3 md:gap-5 mb-6 md:mb-12 border-l-2 border-ocean-dark/20 pl-4 md:pl-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-sans font-medium text-ocean-dark/80 leading-relaxed text-[13px] sm:text-sm md:text-base mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <AnimatePresence>
            {!isExpanded && (
              <motion.button
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsExpanded(true)}
                className="group flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 rounded-none bg-editorial-bg text-editorial-text hover:bg-ocean-dark transition-all duration-300 shadow-xl"
              >
                <span className="font-display font-bold text-xs md:text-sm tracking-widest mt-0.5">
                  {toDynamicUpperCase(t("aboutUs.ctaText"))}
                </span>
                <FiArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]"
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ==========================================
            RIGHT SIDE: ASYMMETRICAL IMAGE COLLAGE
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full lg:w-1/2 flex justify-center mt-4 lg:mt-0"
        >
          <div className="relative w-[85%] sm:w-[90%] md:w-full max-w-[320px] md:max-w-[450px] aspect-square md:aspect-[4/5]">
            {/* 👑 FIX: Scaled down absolute decorative box and pulled it inward (-left-2) */}
            <div className="absolute top-2 -left-2 md:top-4 md:-left-12 w-20 h-20 md:w-56 md:h-56 bg-accent-purple rounded-none rotate-6 -z-10 mix-blend-multiply opacity-80" />

            <div className="absolute top-0 right-0 w-[75%] h-[85%] rounded-none overflow-hidden shadow-2xl z-10 bg-white">
              <img
                src={aboutUs.images[0].src}
                alt="Studio 1"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[60%] h-[55%] rounded-none overflow-hidden shadow-2xl z-20 bg-white">
              <img
                src={aboutUs.images[1].src}
                alt="Studio 2"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==========================================
          EXPANDED CONTENT: MAGAZINE TYPOGRAPHY GRID
          ========================================== */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full overflow-hidden mt-10 md:mt-16"
          >
            <div className="max-w-7xl mx-auto px-5 md:px-16 lg:px-24 pt-8 md:pt-12 pb-6 md:pb-8 border-t border-ocean-dark/20 flex flex-col items-center">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 w-full mb-10 md:mb-16">
                <div className="w-full lg:w-[40%] flex flex-col items-start">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-ocean-dark mb-4 md:mb-6">
                    {toDynamicUpperCase(t("aboutUs.expanded.title"))}
                  </h3>
                  <div className="flex flex-col gap-3 md:gap-4">
                    {t("aboutUs.expanded.paragraphs", {
                      returnObjects: true,
                    }).map((para, i) => (
                      <p
                        key={i}
                        className="font-sans font-medium text-ocean-dark/80 leading-relaxed text-[13px] sm:text-sm md:text-base"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-start justify-center border-l-2 border-accent-yellow pl-4 md:pl-6"
                    >
                      {/* 👑 FIX: Stats number scaled down slightly on base mobile */}
                      <span className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-ocean-dark mb-1 md:mb-2 tracking-tighter">
                        {stat.value}
                      </span>
                      <span className="font-sans text-[10px] md:text-xs lg:text-sm font-bold text-ocean-dark/60 tracking-widest">
                        {toDynamicUpperCase(stat.label)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="group flex flex-col items-center gap-2 md:gap-3 text-ocean-dark/50 hover:text-ocean-dark transition-colors duration-300"
              >
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest">
                  {toDynamicUpperCase(t("aboutUs.expanded.closeText"))}
                </span>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-none border border-ocean-dark/20 flex items-center justify-center group-hover:bg-ocean-dark group-hover:text-editorial-text transition-all duration-300">
                  <FiArrowUp size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutUs;
