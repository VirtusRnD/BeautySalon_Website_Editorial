import React from "react";
import { config } from "../config";
import { FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toDynamicUpperCase } from "../utils/stringHelpers";

// 👑 FIX: Added helper for Dynamic text size inside the Footer
const getDynamicTitleSize = (text = "") => {
  if (!text) return "text-4xl md:text-6xl lg:text-7xl";
  const maxLen = Math.max(...text.split(" ").map((w) => w.length));

  if (maxLen >= 12) {
    return "text-3xl md:text-5xl lg:text-6xl";
  } else if (maxLen >= 8) {
    return "text-4xl md:text-6xl lg:text-7xl";
  }
  return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl";
};

const Footer = () => {
  const { footer } = config;
  const { t } = useTranslation();

  const companyLinksText =
    t("footer.links.company", { returnObjects: true }) || [];
  const companyUrls = footer.links.companyUrls || [];

  const supportLinksText =
    t("footer.links.support", { returnObjects: true }) || [];
  const supportUrls = footer.links.supportUrls || [];

  const contactInfo = t("contact.info", { returnObjects: true }) || [];
  const addressText = contactInfo[0]?.text || "";

  const newsletterTitle = t("footer.newsletter.title");
  const dynamicTitleClass = getDynamicTitleSize(newsletterTitle);

  const renderSocialIcon = (id) => {
    switch (id) {
      case "google":
        return <FaGoogle size={18} />;
      case "facebook":
        return <FaFacebookF size={18} />;
      case "twitter":
        return <FaTwitter size={18} />;
      case "instagram":
        return <FaInstagram size={18} />;
      default:
        return null;
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    // 👑 FIX: Reduced top padding
    <footer className="relative w-full bg-ocean-dark text-editorial-text pt-16 md:pt-32 overflow-hidden flex flex-col justify-end z-20">
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-24 w-full">
        {/* ==========================================
            NEWSLETTER SECTION (Split Editorial Style)
            ========================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          // 👑 FIX: Reduced margins to pull content tighter together on mobile
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12 mb-12 md:mb-28"
        >
          {/* Left: Huge Title */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <h2
              className={`font-display font-extrabold ${dynamicTitleClass} leading-[0.9] tracking-tighter text-editorial-text mb-4 md:mb-6`}
            >
              {toDynamicUpperCase(newsletterTitle)}
            </h2>
            <p className="font-sans font-medium text-editorial-text/70 leading-relaxed text-sm md:text-base max-w-md">
              {t("footer.newsletter.description")}
            </p>
          </div>

          {/* Right: Print-Style Form */}
          <div className="w-full lg:w-1/2 flex flex-col mt-4 lg:mt-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-end w-full gap-4"
            >
              <input
                type="email"
                placeholder={toDynamicUpperCase(
                  t("footer.newsletter.placeholder"),
                )}
                className="w-full bg-transparent border-b-[3px] border-editorial-text/30 text-editorial-text placeholder-editorial-text/50 py-3 md:py-4 font-display font-bold text-xs md:text-sm tracking-widest outline-none focus:border-editorial-text transition-colors rounded-none"
                required
              />
              <button
                type="submit"
                className="group flex-shrink-0 flex items-center justify-center gap-3 bg-editorial-text text-ocean-dark px-6 md:px-8 py-3 md:py-4 border-[3px] border-editorial-text font-display font-bold text-xs md:text-sm tracking-widest hover:bg-transparent hover:text-editorial-text transition-all duration-300 w-full sm:w-auto"
              >
                {toDynamicUpperCase(t("footer.newsletter.buttonText"))}
                <FiArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]"
                />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Thick Section Divider */}
        {/* 👑 FIX: Brought bottom margin down */}
        <div className="w-full h-[2px] bg-editorial-text/20 mb-12 md:mb-20" />

        {/* ==========================================
            INDEX GRID (Magazine Masthead Style)
            ========================================== */}
        {/* 👑 FIX: Reduced gap spacing heavily for mobile view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 md:mb-32">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter text-editorial-text mb-4 md:mb-6">
              {toDynamicUpperCase(t("navbar.logo"))}
            </h3>
            <p className="font-sans text-[13px] md:text-sm font-medium text-editorial-text/60 leading-relaxed mb-6 md:mb-8 max-w-xs">
              {t("footer.brand.description")}
            </p>
            <div className="flex flex-col gap-3 md:gap-4">
              <a
                href={`mailto:${footer.brand.email}`}
                className="font-display font-bold text-xs md:text-sm tracking-widest text-editorial-text hover:text-accent-yellow transition-colors"
              >
                {toDynamicUpperCase(footer.brand.email)}
              </a>
              <a
                href={`tel:${footer.brand.phone}`}
                className="font-display font-bold text-xs md:text-sm tracking-widest text-editorial-text hover:text-accent-yellow transition-colors"
              >
                {footer.brand.phone}
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="lg:col-span-3 flex flex-col lg:pl-8">
            <h4 className="font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] text-editorial-text/40 mb-6 md:mb-8 uppercase">
              {toDynamicUpperCase(t("footer.headings.company"))}
            </h4>
            <ul className="flex flex-col gap-4 md:gap-5">
              {companyLinksText.map((link, index) => (
                <li key={index}>
                  <a
                    href={companyUrls[index] || "#"}
                    className="font-display font-bold text-xs md:text-sm tracking-widest text-editorial-text hover:text-accent-yellow transition-colors"
                  >
                    {toDynamicUpperCase(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] text-editorial-text/40 mb-6 md:mb-8 uppercase">
              {toDynamicUpperCase(t("footer.headings.support"))}
            </h4>
            <ul className="flex flex-col gap-4 md:gap-5">
              {supportLinksText.map((link, index) => (
                <li key={index}>
                  <a
                    href={supportUrls[index] || "#"}
                    className="font-display font-bold text-xs md:text-sm tracking-widest text-editorial-text hover:text-accent-yellow transition-colors"
                  >
                    {toDynamicUpperCase(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] text-editorial-text/40 mb-6 md:mb-8 uppercase">
              {toDynamicUpperCase(t("footer.headings.contact"))}
            </h4>
            <p className="font-sans text-[13px] md:text-sm font-medium text-editorial-text/60 leading-relaxed mb-6 md:mb-8">
              {addressText}
            </p>
            <div className="flex items-center gap-4">
              {footer.contact.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-editorial-text hover:text-accent-yellow transition-colors"
                  aria-label={social.id}
                >
                  {renderSocialIcon(social.id)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          BOTTOM WATERMARK & COPYRIGHT
          ========================================== */}
      <div className="w-full flex flex-col items-center overflow-hidden border-t border-editorial-text/10">
        <div className="w-full py-5 md:py-6 flex justify-center">
          <p className="font-sans font-medium text-[10px] md:text-xs text-editorial-text/40 tracking-widest">
            {toDynamicUpperCase(t("footer.copyright"))}
          </p>
        </div>

        {/* MASSIVE EDGE-TO-EDGE LOGO */}
        <div className="w-full flex justify-center translate-y-[20%] pointer-events-none select-none">
          <span className="font-display font-extrabold text-[20vw] md:text-[18vw] leading-none tracking-tighter text-editorial-text/5">
            {toDynamicUpperCase(t("navbar.logo"))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
