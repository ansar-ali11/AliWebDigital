import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AliWebDigital" },
      {
        name: "description",
        content:
          "Web development, portfolio sites, business websites, admin panels, UI/UX and branding by AliWebDigital.",
      },
      { property: "og:title", content: "Services — AliWebDigital" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
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
      <ContactSection />
    </SiteLayout>
  );
}
