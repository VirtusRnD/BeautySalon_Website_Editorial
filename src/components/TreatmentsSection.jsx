import React from "react";
import { config } from "../config";
import TreatmentBlock from "./TreatmentBlock";
import { useTranslation } from "react-i18next";
import { toDynamicUpperCase } from "../utils/stringHelpers";

const TreatmentsSection = () => {
  const { t } = useTranslation();

  const treatmentTexts = t("treatments.items", { returnObjects: true }) || [];
  const treatmentConfigs = config.treatments.items || [];

  const backgroundText = toDynamicUpperCase(
    t("treatments.title", "TREATMENTS"),
  );

  return (
    <section
      id="treatments"
      className="relative w-full py-24 md:py-40 overflow-hidden bg-editorial-text text-ocean-dark"
    >
      {/* 👑 MASSIVE REPEATING BACKGROUND TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden z-0 pointer-events-none opacity-[0.04] select-none py-12">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className="font-display text-[22vw] font-extrabold whitespace-nowrap leading-none"
          >
            {backgroundText}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col gap-32 md:gap-48">
        {treatmentConfigs.map((configItem, index) => (
          <TreatmentBlock
            key={configItem.id}
            configData={configItem}
            textData={treatmentTexts[index] || {}}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default TreatmentsSection;
