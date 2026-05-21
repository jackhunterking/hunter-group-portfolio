import Nav from "@/components/Nav";
import HomeHero from "@/components/HomeHero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CapitalTeaser from "@/components/CapitalTeaser";
import GuidesSection from "@/components/GuidesSection";
import PromiseSection from "@/components/PromiseSection";
import LogoStrip from "@/components/LogoStrip";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Nav overlayHero />
      <HomeHero />
      <AboutSection />
      <ServicesSection />
      <CapitalTeaser />
      <GuidesSection />
      <PromiseSection />
      <LogoStrip />
      <ContactSection />
      <Footer />
    </main>
  );
}
