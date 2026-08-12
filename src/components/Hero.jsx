import React from "react";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { config } from "../config";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toDynamicUpperCase } from "../utils/stringHelpers";

const Hero = () => {
  const { hero } = config;
  const { t } = useTranslation();

  const titleFirstLine = toDynamicUpperCase(t("hero.titleFirstLine"));
  const titleSecondLine = toDynamicUpperCase(t("hero.titleSecondLine"));

  return (
    // 👑 FIX: Restored h-[100svh] so the section fills the screen and removes the massive top gap
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-editorial-bg">
      {/* ==========================================
          LAYER 0: BACKGROUND TEXT 
          ========================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        // 👑 FIX: Pushed up slightly (top-[38%]) to sit securely behind the hair on the larger image
        className="absolute top-[38%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none px-4"
      >
        <h1
          className="font-display font-extrabold tracking-tighter text-editorial-text/30 whitespace-nowrap"
          style={{
            fontSize: `clamp(1.5rem, min(14vw, ${100 / titleFirstLine.length}vw), 15rem)`,
          }}
        >
          {titleFirstLine}
        </h1>
      </motion.div>

      {/* ==========================================
          LAYER 10: TRANSPARENT MODEL CUTOUT
          ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute bottom-0 left-0 w-full flex justify-center z-10 pointer-events-none"
      >
        {/* 👑 FIX: Enlarged the image on mobile (h-[65svh]) to anchor the composition */}
        <img
          src={hero.fanImages[0].src}
          alt="Cover Model"
          className="w-auto h-[65svh] md:h-[80svh] lg:h-[90svh] max-w-[150vw] md:max-w-none object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      {/* ==========================================
          LAYER 20: FOREGROUND TEXT 
          ========================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        // 👑 FIX: Shifted up to top-[68%] to clear the button, frame the model's torso, and avoid overlap
        className="absolute top-[68%] md:top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none px-4"
      >
        <h1
          className="font-display font-extrabold tracking-tighter text-editorial-text drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] whitespace-nowrap"
          style={{
            fontSize: `clamp(2rem, min(15vw, ${100 / titleSecondLine.length}vw), 16rem)`,
          }}
        >
          {titleSecondLine}
        </h1>
      </motion.div>

      {/* ==========================================
          LAYER 30: FLOATING UI ELEMENTS
          ========================================== */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-[45%] md:top-[50%] -translate-y-1/2 left-6 md:left-12 max-w-[200px] lg:max-w-[240px] z-30 hidden md:block"
      >
        <div className="w-8 h-[2px] bg-editorial-text mb-4 opacity-50" />
        <p className="text-xs md:text-sm text-editorial-text/90 font-medium leading-relaxed">
          {t("hero.description")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        // 👑 FIX: Constrained button width heavily and anchored it to the bottom
        className="absolute bottom-6 md:bottom-12 right-1/2 translate-x-1/2 md:translate-x-0 md:right-12 z-30 w-[85%] sm:w-[320px] md:w-auto flex justify-center"
      >
        <a
          href={hero.ctaLink}
          // 👑 FIX: Shrunk inner padding drastically to slim down the button
          className="group flex items-center justify-center gap-3 md:gap-4 w-full md:w-auto px-4 py-3 md:px-8 md:py-4 rounded-none bg-editorial-text text-ocean-dark border-[3px] border-editorial-text hover:bg-transparent hover:text-editorial-text transition-all duration-300 shadow-xl pointer-events-auto"
        >
          {/* 👑 FIX: Added whitespace-nowrap and shrunk text to force a sleek, single-line display */}
          <span className="font-display font-extrabold text-[11px] sm:text-xs md:text-base tracking-widest mt-0.5 whitespace-nowrap">
            {toDynamicUpperCase(t("hero.ctaText"))}
          </span>
          <FiArrowRight
            size={16}
            className="md:w-5 md:h-5 group-hover:translate-x-2 transition-transform"
          />
        </a>
      </motion.div>

      {/* Fake Rating */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        // 👑 FIX: Pushed bottom rating up slightly to float evenly over the slimmed-down button
        className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-editorial-text z-30 pointer-events-none"
      >
        <span className="font-display font-bold text-base md:text-2xl mt-1">
          4.9/5
        </span>
        <FiStar
          size={14}
          className="md:w-4 md:h-4 fill-accent-yellow text-accent-yellow"
        />
        <span className="font-sans text-[11px] md:text-sm font-medium opacity-80">
          18,021
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
