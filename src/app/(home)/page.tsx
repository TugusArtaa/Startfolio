"use client";

import { HeroSection } from "../../components/home/HeroSection";
import { StatsSection } from "../../components/home/StatsSection";
import { FeaturesSection } from "../../components/home/FeaturesSection";
import { TemplatesSection } from "../../components/home/TemplatesSection";
import { HowItWorksSection } from "../../components/home/HowItWorksSection";
import { FAQSection } from "../../components/home/FAQSection";
import { ContactSection } from "../../components/home/ContactSection";

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TemplatesSection />
      <HowItWorksSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
