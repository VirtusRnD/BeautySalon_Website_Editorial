import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ReactLenis } from "lenis/react";
import { config } from "./config";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import CustomScrollbar from "./components/CustomScrollbar";
import Gallery from "./components/Gallery";
import TreatmentsSection from "./components/TreatmentsSection";
import Reviews from "./components/Reviews";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import BookingModal from "./components/BookingModal";

function App() {
  // Store the core components in a variable to avoid repeating code
  const appContent = (
    <main className="relative w-full min-h-screen font-sans text-[#111111] bg-ocean-faint">
      {/* 👑 SEAMLESS BACKGROUND PATTERN OVERLAY */}
      {/* pointer-events-none ensures it doesn't block you from clicking anything */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: "url('/wavy-seamless-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto", // Keeps the SVG at its native crisp resolution
        }}
      />

      <CustomScrollbar />

      {/* Ensure all components sit above the pattern using relative positioning */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AboutUs />
        <Gallery />
        <TreatmentsSection />
        <Reviews />
        <FaqSection />
        <ContactSection />
        <Footer />

        <BookingModal />
      </div>
    </main>
  );

  return (
    <HelmetProvider>
      {/* Dynamic SEO and Tab Title */}
      <Helmet>
        <title>Stylin Beauty | Ocean & Gold</title>
        <meta
          name="description"
          content="Experience luxury treatments crafted with precision and a touch of timeless elegance."
        />
      </Helmet>

      {/* 👑 CONDITIONAL SMOOTH SCROLLING */}
      {config.settings.smoothScroll ? (
        <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
          {appContent}
        </ReactLenis>
      ) : (
        appContent
      )}
    </HelmetProvider>
  );
}

export default App;
