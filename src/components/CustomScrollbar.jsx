import React, { useState, useEffect, useRef } from "react";

const CustomScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  const updateScrollData = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const heightRatio = windowHeight / documentHeight;
    const calculatedHeight = Math.max(heightRatio * windowHeight, 40);

    setThumbHeight(calculatedHeight);

    const maxScroll = documentHeight - windowHeight;
    const currentScroll = window.scrollY;

    if (maxScroll > 0) {
      setScrollProgress(currentScroll / maxScroll);
    }
  };

  useEffect(() => {
    updateScrollData();
    window.addEventListener("scroll", updateScrollData, { passive: true });
    window.addEventListener("resize", updateScrollData);

    return () => {
      window.removeEventListener("scroll", updateScrollData);
      window.removeEventListener("resize", updateScrollData);
    };
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.userSelect = "none";

    const startY = e.clientY;
    const startScrollY = window.scrollY;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const maxThumbY = windowHeight - thumbHeight;

    const handlePointerMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const scrollDelta = (deltaY / maxThumbY) * maxScroll;
      window.scrollTo(0, startScrollY + scrollDelta);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const maxThumbTranslate = window.innerHeight - thumbHeight;
  const thumbTranslateY = scrollProgress * maxThumbTranslate;

  return (
    <div
      ref={trackRef}
      className="fixed top-0 right-0 h-screen w-2 md:w-3 z-[9999] pointer-events-none"
    >
      <div
        onPointerDown={handlePointerDown}
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTranslateY}px)`,
        }}
        // 👑 EDITORIAL SHIFT: Completely solid, sharp rectangle. Colors match the magazine palette perfectly.
        className={`absolute right-0 w-full rounded-none pointer-events-auto cursor-grab active:cursor-grabbing transition-colors duration-300
        border-l-2 border-editorial-bg shadow-md
        ${isDragging ? "bg-accent-yellow" : "bg-ocean-dark hover:bg-accent-purple"}
        `}
      />
    </div>
  );
};

export default CustomScrollbar;
