import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { PricingSection } from "@/components/site/PricingSection";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title={<>Capabilities for <span className="text-electric">modern</span> teams.</>}
        description="From scrappy MVPs to enterprise-grade platforms — every engagement is led senior‑first and shipped with obsessive craft."
      />
      <ServicesGrid heading={false} />
      <PricingSection />
      <ContactSection />
    </SiteLayout>
  );
}
