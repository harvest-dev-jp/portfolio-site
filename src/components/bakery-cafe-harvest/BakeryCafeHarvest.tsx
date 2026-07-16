import AboutSection from "./AboutSection";
import AccessSection from "./AccessSection";
import BackToTop from "./BackToTop";
import BakeryFooter from "./BakeryFooter";
import BakeryHeader from "./BakeryHeader";
import CafeSection from "./CafeSection";
import ContactSection from "./ContactSection";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import MenuSection from "./MenuSection";
import NewsSection from "./NewsSection";
import SeasonalDecoration from "./SeasonalDecoration";
import SeasonalSection from "./SeasonalSection";

export default function BakeryCafeHarvest() {
  return (
    <div className="relative -mt-4 overflow-x-clip bg-[#F7F3EA] text-[#333333]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .bakery-hero-item {
              opacity: 0;
              transform: translateY(18px);
              animation: bakeryFadeUp 900ms ease forwards;
            }
            .bakery-hero-item:nth-child(1) { animation-delay: 120ms; }
            .bakery-hero-item:nth-child(2) { animation-delay: 300ms; }
            .bakery-hero-item:nth-child(3) { animation-delay: 480ms; }
            .bakery-hero-item:nth-child(4) { animation-delay: 660ms; }
            .bakery-reveal {
              opacity: 0;
              transform: translateY(24px);
              transition: opacity 700ms ease, transform 700ms ease;
            }
            .bakery-reveal-visible {
              opacity: 1;
              transform: translateY(0);
            }
            .bakery-floating {
              position: absolute;
              width: 10px;
              height: 18px;
              border-radius: 70% 20% 70% 20%;
              background: rgba(201, 138, 69, .22);
              animation: bakeryFloat 12s linear infinite;
            }
            .bakery-floating-1 { left: 12%; top: -20px; animation-delay: 0s; }
            .bakery-floating-2 { left: 38%; top: -30px; animation-delay: 2s; }
            .bakery-floating-3 { left: 66%; top: -22px; animation-delay: 5s; }
            .bakery-floating-4 { left: 82%; top: -28px; animation-delay: 7s; }
            @keyframes bakeryFadeUp {
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bakeryFloat {
              0% { transform: translate3d(0, -20px, 0) rotate(0deg); opacity: 0; }
              12% { opacity: .8; }
              100% { transform: translate3d(-40px, 108vh, 0) rotate(180deg); opacity: 0; }
            }
            @media (max-width: 640px) {
              .bakery-floating-3,
              .bakery-floating-4 { display: none; }
            }
            @media (prefers-reduced-motion: reduce) {
              .bakery-hero-item,
              .bakery-reveal,
              .bakery-floating {
                animation: none !important;
                transition: none !important;
                opacity: 1 !important;
                transform: none !important;
              }
            }
          `,
        }}
      />

      <BakeryHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <div className="relative">
          <SeasonalDecoration />
          <SeasonalSection />
        </div>
        <MenuSection />
        <CafeSection />
        <GallerySection />
        <NewsSection />
        <AccessSection />
        <ContactSection />
      </main>
      <BakeryFooter />
      <BackToTop />
    </div>
  );
}
