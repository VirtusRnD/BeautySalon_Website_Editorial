import React from "react";
import { config } from "../config";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Added text-2xl drop bounds to prevent horizontal scroll bars
const getDynamicTitleSize = (text = "") => {
  if (!text) return "text-3xl md:text-7xl";
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  if (maxLen >= 12) {
    return "text-2xl sm:text-3xl md:text-5xl lg:text-7xl";
  } else if (maxLen >= 8) {
    return "text-3xl sm:text-4xl md:text-6xl lg:text-[5.5rem]";
  }

  return "text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]";
};

const Gallery = () => {
  const { gallery } = config;
  const { t } = useTranslation();

  const galleryTitle = t("gallery.title");
  const dynamicTitleClass = getDynamicTitleSize(galleryTitle);

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
      id="gallery"
      // 👑 FIX: Reduced top and bottom padding on mobile
      className="relative w-full py-10 md:py-40 overflow-hidden bg-editorial-bg text-editorial-text"
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none opacity-[0.03] select-none">
        {/* 👑 FIX: text-[25vw] dropped to text-[20vw] for base sizes */}
        <span className="font-display text-[20vw] sm:text-[25vw] md:text-[30vw] font-extrabold whitespace-nowrap">
          {toDynamicUpperCase(galleryTitle)}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-24 flex flex-col">
        {/* 👑 FIX: Gap on mobile reduced from gap-10 to gap-8 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-8 w-full relative z-30">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full md:w-6/12 lg:w-7/12 flex flex-col items-start pb-4 md:pb-8 relative z-40 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
              <div className="w-6 md:w-8 h-[2px] bg-accent-yellow" />
              <span className="font-sans text-[10px] md:text-sm font-bold tracking-[0.2em]">
                {toDynamicUpperCase(t("gallery.overline"))}
              </span>
            </div>

            <h2
              className={`font-display font-extrabold ${dynamicTitleClass} leading-[0.9] tracking-tighter text-editorial-text`}
            >
              {toDynamicUpperCase(galleryTitle)}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-[85%] sm:w-[90%] md:w-5/12 lg:w-4/12 relative pointer-events-auto self-end md:self-auto"
          >
            {/* 👑 FIX: Decorative accent drastically scaled down and brought inward so it won't overflow the x-axis */}
            <div className="absolute -top-2 -right-2 md:-top-12 md:-right-12 w-16 h-16 md:w-48 md:h-48 bg-accent-purple rounded-none rotate-12 -z-10 shadow-2xl" />

            <div className="w-full aspect-[4/3] rounded-none overflow-hidden shadow-2xl">
              <img
                src={gallery.images[0].src}
                alt="Gallery 1"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* 👑 FIX: mt-12 shifted to mt-10 */}
        <div className="flex justify-start w-full mt-10 md:-mt-20 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-[75%] sm:w-[80%] md:w-4/12 md:ml-12"
          >
            <div className="w-full aspect-[3/4] rounded-none overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <img
                src={gallery.images[1].src}
                alt="Gallery 2"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center w-full mt-10 md:-mt-48 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-[85%] sm:w-[90%] md:w-5/12 relative"
          >
            {/* 👑 FIX: Dropped size and distance of this accent block on mobile */}
            <div className="absolute -bottom-3 -left-3 md:-bottom-16 md:-left-16 w-20 h-20 md:w-64 md:h-64 bg-accent-yellow rounded-none -rotate-6 -z-10 shadow-2xl mix-blend-screen opacity-90" />

            <div className="w-full aspect-square md:aspect-[4/5] rounded-none overflow-hidden shadow-2xl">
              <img
                src={gallery.images[2].src}
                alt="Gallery 3"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* 👑 FIX: Removed extreme layout jumps (mt-12) to slightly more controlled (mt-10) spacing */}
        <div className="flex flex-col md:flex-row justify-between items-start mt-10 md:-mt-32 relative z-20 gap-8 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-[65%] sm:w-[70%] md:w-3/12"
          >
            <div className="w-full aspect-[4/5] rounded-none overflow-hidden shadow-xl">
              <img
                src={gallery.images[3].src}
                alt="Gallery 4"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="w-[80%] sm:w-[85%] md:w-4/12 md:mr-16 md:mt-24 self-end md:self-auto"
          >
            <div className="w-full aspect-[3/4] rounded-none overflow-hidden shadow-2xl">
              <img
                src={gallery.images[4].src}
                alt="Gallery 5"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
