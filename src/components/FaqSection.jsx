import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Tweaked dynamic title base sizes to ensure mobile fit
const getDynamicTitleSize = (text = "") => {
  if (!text) return "text-3xl md:text-6xl lg:text-[6rem]";
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  if (maxLen >= 12) {
    return "text-2xl sm:text-3xl md:text-5xl lg:text-[5rem]";
  } else if (maxLen >= 8) {
    return "text-3xl sm:text-4xl md:text-6xl lg:text-[5.5rem]";
  }
  return "text-3xl sm:text-5xl md:text-6xl lg:text-[6rem]";
};

const FaqSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = t("faq.items", { returnObjects: true }) || [];
  const faqTitle = t("faq.title");
  const dynamicTitleClass = getDynamicTitleSize(faqTitle);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section
      id="faq"
      // 👑 FIX: Scaled padding down to py-10
      className="relative w-full py-10 md:py-40 overflow-hidden bg-editorial-text text-ocean-dark"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-12 flex flex-col items-center">
        {/* ==========================================
            CENTERED EDITORIAL HEADER
            ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          // 👑 FIX: Shrunk margin-bottom
          className="w-full flex flex-col items-center text-center mb-10 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 w-full">
            <div className="w-6 md:w-12 h-[2px] bg-accent-purple" />
            <span className="font-sans text-[10px] md:text-sm font-bold tracking-[0.2em] whitespace-nowrap">
              {toDynamicUpperCase(t("faq.overline"))}
            </span>
            <div className="w-6 md:w-12 h-[2px] bg-accent-purple" />
          </div>

          <h2
            className={`font-display font-extrabold ${dynamicTitleClass} leading-[1] tracking-tighter text-ocean-dark mb-5 md:mb-8`}
          >
            {toDynamicUpperCase(faqTitle)}
          </h2>

          <p className="font-sans font-medium text-ocean-dark/70 leading-relaxed text-[13px] sm:text-sm md:text-base max-w-lg mx-auto">
            {t("faq.description")}
          </p>
        </motion.div>

        {/* ==========================================
            MINIMALIST ACCORDION LIST
            ========================================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-4xl flex flex-col"
        >
          <div className="w-full h-[3px] bg-ocean-dark mb-4" />

          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                variants={fadeUp}
                key={index}
                className="flex flex-col border-b-2 border-ocean-dark/20 overflow-hidden group"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  // 👑 FIX: py-5 changed to py-4 on small screens to save space
                  className="w-full flex items-center justify-between py-4 md:py-8 text-left transition-colors duration-300"
                >
                  {/* 👑 FIX: Changed base text-lg to text-base so long questions don't cramp */}
                  <span
                    className={`font-display text-base sm:text-lg md:text-3xl font-bold pr-3 md:pr-6 transition-colors duration-300 leading-tight
                    ${isOpen ? "text-editorial-bg" : "text-ocean-dark group-hover:text-editorial-bg"}`}
                  >
                    {item.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 transition-colors duration-300 
                    ${isOpen ? "text-editorial-bg" : "text-ocean-dark group-hover:text-editorial-bg"}`}
                  >
                    <FiPlus
                      size={20}
                      strokeWidth={3}
                      className="md:w-7 md:h-7"
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pb-5 md:pb-8 pr-4 md:pr-12 font-sans font-medium text-ocean-dark/70 leading-relaxed text-[13px] sm:text-sm md:text-lg">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
