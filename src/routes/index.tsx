import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { BannerCarousel } from "@/components/site/BannerCarousel";
import { Marquee } from "@/components/site/Marquee";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ProjectsGrid } from "@/components/site/ProjectsGrid";
import { Stats } from "@/components/site/Stats";
import { ContactSection } from "@/components/site/ContactSection";
import { IntroSplash } from "@/components/site/IntroSplash";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <IntroSplash />
      <Hero />
      <BannerCarousel />
      <Marquee />
      <ServicesGrid />
      <ProjectsGrid limit={4} />
      <Stats />
      <ContactSection />
    </SiteLayout>
  );
}