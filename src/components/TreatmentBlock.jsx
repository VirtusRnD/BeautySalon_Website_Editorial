import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Adjusted helper function to scale even smaller for mobile
const getDynamicTitleSize = (boldText = "", lightText = "") => {
  const getLongestWord = (str) => {
    if (!str) return 0;
    return Math.max(...str.split(" ").map((w) => w.length));
  };

  const maxLen = Math.max(getLongestWord(boldText), getLongestWord(lightText));

  if (maxLen >= 12) {
    return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[4rem]";
  } else if (maxLen >= 8) {
    return "text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem]";
  }

  return "text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem]";
};

const TreatmentBlock = ({ configData, textData, index }) => {
  const isLeft = configData.imageLeft;
  const accentColor = index % 2 === 0 ? "bg-accent-yellow" : "bg-accent-purple";

  const dynamicTitleSizeClass = getDynamicTitleSize(
    textData.titleBold,
    textData.titleLight,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      // 👑 FIX: Toned down mobile gaps from gap-12 to gap-8
      className={`relative flex flex-col gap-8 lg:gap-0 items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      <div
        className={`w-full lg:w-[45%] flex justify-center relative z-10 ${isLeft ? "lg:justify-start" : "lg:justify-end"}`}
      >
        <div className="relative flex-shrink-0 w-[85%] sm:w-[350px] lg:w-[380px]">
          <div
            className={`absolute ${isLeft ? "-top-4 -left-4 md:-top-10 md:-left-10" : "-bottom-4 -right-4 md:-bottom-10 md:-right-10"} 
            w-24 h-24 md:w-48 md:h-48 ${accentColor} rounded-none ${isLeft ? "-rotate-12" : "rotate-12"} -z-10 shadow-xl`}
          />

          <div className="w-full aspect-[4/5] rounded-none overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] bg-white z-0">
            <img
              src={configData.imageSrc}
              alt={textData.titleBold}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div
            className={`absolute bottom-6 md:bottom-12 z-10 ${isLeft ? "-right-2 md:-right-12" : "-left-2 md:-left-12"} 
            bg-ocean-dark text-editorial-text shadow-2xl py-2 px-4 md:py-4 md:px-8 flex flex-col items-center justify-center rotate-3`}
          >
            <span className="font-display font-extrabold text-lg md:text-3xl">
              {textData.durationText}
            </span>
            <span className="font-sans text-[10px] md:text-sm font-bold tracking-[0.2em] mt-1 opacity-80">
              {toDynamicUpperCase(textData.durationLabel)}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left relative z-30 mt-6 lg:mt-0 
        ${isLeft ? "lg:-ml-12" : "lg:-mr-12"}`}
      >
        <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 mb-4 md:mb-6 w-full">
          <div className="w-8 h-[2px] bg-ocean-dark" />
          <span className="font-sans text-[10px] md:text-sm font-bold tracking-[0.2em] text-ocean-dark">
            {toDynamicUpperCase(textData.overlineText)}
          </span>
        </div>

        <h3
          className={`font-display font-extrabold ${dynamicTitleSizeClass} leading-[1.05] text-ocean-dark mb-4 md:mb-6 tracking-tight drop-shadow-xl text-center lg:text-left w-full`}
        >
          <span className="block">
            {toDynamicUpperCase(textData.titleBold)}
          </span>
          <span className="block text-editorial-bg drop-shadow-md">
            {toDynamicUpperCase(textData.titleLight)}
          </span>
        </h3>

        <p className="font-sans font-medium text-ocean-dark/80 leading-relaxed text-sm md:text-base mb-8 md:mb-10 text-center lg:text-left max-w-lg">
          {textData.description}
        </p>

        {/* 👑 FIX: Button padding scaled down slightly for mobile */}
        <a
          href={configData.buttonLink}
          className="group flex items-center justify-center gap-4 w-full md:w-auto px-6 py-3 md:px-8 md:py-4 bg-ocean-dark text-editorial-text hover:bg-editorial-bg hover:text-ocean-dark transition-all duration-300 shadow-xl"
        >
          <span className="font-display font-bold text-xs md:text-sm tracking-widest mt-0.5">
            {toDynamicUpperCase(textData.buttonText)}
          </span>
          <FiArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>
    </motion.div>
  );
};

export default TreatmentBlock;
