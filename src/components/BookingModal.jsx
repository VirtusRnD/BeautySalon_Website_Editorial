import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Helper function to calculate dynamic font size based on the longest word
const getDynamicTitleSize = (text = "") => {
  if (!text) return "text-3xl md:text-4xl lg:text-5xl"; // fallback
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  // If a word is 12+ characters (e.g., RESERVATION)
  if (maxLen >= 12) {
    return "text-2xl md:text-3xl lg:text-4xl";
  }
  // If a word is 8-11 characters (e.g., BOOKING)
  else if (maxLen >= 8) {
    return "text-3xl md:text-4xl lg:text-5xl";
  }

  // Default for shorter words
  return "text-4xl md:text-5xl lg:text-6xl";
};

const BookingModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleHashChange = () => {
      if (window.location.hash === "#booking") {
        setIsOpen(true);
        window.history.replaceState(null, null, window.location.pathname);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const services = t("booking.services", { returnObjects: true }) || [];

  // 👑 FIX: Store the title and get its dynamic size class
  const bookingTitle = t("booking.title");
  const dynamicTitleSizeClass = getDynamicTitleSize(bookingTitle);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-0">
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-ocean-dark/90 cursor-pointer"
          />

          <div className="relative w-full max-w-2xl z-10">
            {/* 👑 FIX: Changed rounded-2xl to rounded-none for the sharp accent block */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 bg-accent-yellow rounded-none rotate-12 -z-10 shadow-xl" />

            {/* 👑 FIX: Changed rounded-2xl to rounded-none for the main modal container */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full bg-editorial-text border-[6px] md:border-8 border-ocean-dark shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-none p-8 md:p-12 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-editorial-text border-[3px] border-ocean-dark hover:bg-accent-purple hover:text-editorial-text rounded-none flex items-center justify-center text-ocean-dark transition-colors duration-300 z-20"
              >
                <FiX size={24} strokeWidth={3} />
              </button>

              {/* Header */}
              <div className="text-center mb-10 border-b-[3px] border-ocean-dark pb-8">
                {/* 👑 FIX: Applied dynamic size class and removed 'break-words' */}
                <h2
                  className={`font-display font-extrabold ${dynamicTitleSizeClass} text-ocean-dark mb-4 tracking-tighter`}
                >
                  {toDynamicUpperCase(bookingTitle)}
                </h2>
                <p className="font-sans font-medium text-sm md:text-base text-ocean-dark/80 max-w-md mx-auto">
                  {t("booking.subtitle")}
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                  <input
                    type="text"
                    placeholder={toDynamicUpperCase(
                      t("booking.namePlaceholder"),
                    )}
                    required
                    className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark placeholder-ocean-dark/40 py-3 font-display font-bold text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none"
                  />
                  <input
                    type="tel"
                    placeholder={toDynamicUpperCase(
                      t("booking.phonePlaceholder"),
                    )}
                    required
                    className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark placeholder-ocean-dark/40 py-3 font-display font-bold text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none"
                  />
                </div>

                <select
                  required
                  defaultValue=""
                  className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark py-3 font-display font-bold text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    {toDynamicUpperCase(t("booking.servicePlaceholder"))}
                  </option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {toDynamicUpperCase(service)}
                    </option>
                  ))}
                </select>

                <div className="flex flex-col sm:flex-row gap-6 w-full">
                  <input
                    type="date"
                    required
                    className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark py-3 font-display font-bold text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none cursor-pointer"
                  />
                  <input
                    type="time"
                    required
                    className="w-full bg-transparent border-b-[3px] border-ocean-dark/20 text-ocean-dark py-3 font-display font-bold text-sm tracking-widest outline-none focus:border-ocean-dark transition-colors rounded-none cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-4 bg-ocean-dark text-editorial-text px-8 py-5 rounded-none border-[3px] border-ocean-dark font-display font-extrabold text-base tracking-widest hover:bg-accent-purple hover:text-ocean-dark transition-all duration-300 mt-6"
                >
                  {toDynamicUpperCase(t("booking.buttonText"))}
                  <FiCheckCircle
                    className="group-hover:scale-110 transition-transform duration-300"
                    size={20}
                  />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
