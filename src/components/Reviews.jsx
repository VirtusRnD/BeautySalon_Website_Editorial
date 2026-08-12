import React from "react";
import { config } from "../config";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Helper function to calculate dynamic font size
const getDynamicTitleSize = (text = "") => {
  if (!text) return "text-4xl md:text-6xl";
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  if (maxLen >= 12) {
    return "text-3xl md:text-5xl lg:text-6xl";
  } else if (maxLen >= 8) {
    return "text-4xl md:text-6xl lg:text-[4.5rem]";
  }

  return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]";
};

const Reviews = () => {
  const { reviews } = config;
  const { t } = useTranslation();

  const reviewTexts = t("reviews.items", { returnObjects: true }) || [];
  const reviewConfigs = reviews.items || [];

  const reviewsTitle = t("reviews.title");
  const dynamicTitleClass = getDynamicTitleSize(reviewsTitle);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section
      id="reviews"
      // 👑 FIX: Reduced top and bottom padding on mobile
      className="relative w-full py-12 md:py-40 overflow-hidden bg-editorial-bg text-editorial-text z-0"
    >
      {/* 👑 FIX: Reduced text-[40vw] to text-[30vw] so the background mark isn't overly dominant on small screens */}
      <FaQuoteLeft className="absolute -top-10 -left-10 md:top-10 md:left-10 text-[30vw] md:text-[25vw] text-editorial-text opacity-5 -z-10 -rotate-12 pointer-events-none" />

      <div className="absolute top-[40%] right-[-5%] w-48 h-48 md:w-96 md:h-96 bg-accent-purple rounded-none rotate-12 mix-blend-multiply opacity-80 -z-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-24 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-16 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full md:w-7/12 flex flex-col items-start"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-8 h-[2px] bg-accent-yellow" />
              <span className="font-sans text-[10px] md:text-sm font-bold tracking-[0.2em]">
                {toDynamicUpperCase(t("reviews.overline"))}
              </span>
            </div>

            {/* 👑 FIX: Using the dynamic font class here */}
            <h2
              className={`font-display font-extrabold ${dynamicTitleClass} leading-[1.05] tracking-tighter text-editorial-text`}
            >
              {toDynamicUpperCase(reviewsTitle)}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full md:w-4/12 flex md:justify-end"
          >
            <p className="font-sans font-medium text-editorial-text/80 leading-relaxed text-sm md:text-base md:text-right">
              {t("reviews.description")}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full"
        >
          {reviewConfigs.map((item, index) => {
            const text = reviewTexts[index] || {};
            const waterfallMargin =
              index === 1 ? "lg:mt-16" : index === 2 ? "lg:mt-32" : "";

            return (
              <motion.div
                variants={fadeUp}
                key={item.id}
                // 👑 FIX: Inner padding reduced on mobile (p-6 vs p-10)
                className={`relative flex flex-col p-6 md:p-10 rounded-none bg-editorial-text text-ocean-dark border-[4px] md:border-[6px] border-ocean-dark shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-4 transition-transform duration-500 overflow-hidden ${waterfallMargin}`}
              >
                <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                  <FaQuoteLeft className="text-accent-purple text-2xl md:text-4xl opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-accent-yellow text-xs md:text-base"
                      />
                    ))}
                  </div>
                </div>

                <p className="font-sans font-semibold text-ocean-dark/90 leading-relaxed text-sm md:text-lg flex-grow mb-8 md:mb-10 relative z-10">
                  "{text.review}"
                </p>

                <div className="w-full h-[3px] bg-ocean-dark/20 mb-6 md:mb-8" />

                <div className="flex items-center gap-4 md:gap-5 relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-none overflow-hidden border-[3px] border-ocean-dark flex-shrink-0">
                    <img
                      src={item.avatar}
                      alt={text.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base md:text-lg leading-none tracking-tight">
                      {toDynamicUpperCase(text.name)}
                    </span>
                    <span className="font-sans text-[10px] md:text-xs font-bold text-ocean-dark/50 tracking-[0.15em] mt-1 md:mt-1.5">
                      {toDynamicUpperCase(text.service)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
