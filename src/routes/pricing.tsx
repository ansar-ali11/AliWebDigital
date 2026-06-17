import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { PricingSection } from "@/components/site/PricingSection";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AliWebDigital" },
      {
        name: "description",
        content:
          "AliWebDigital pricing for websites, apps, and custom digital products. Transparent packages with clear starting rates.",
      },
      { property: "og:title", content: "Pricing — AliWebDigital" },
      { property: "og:url", content: "https://www.aliwebdigital.in/pricing" },
      { property: "og:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { property: "og:image:alt", content: "AliWebDigital website design and branding showcase" },
      { property: "og:site_name", content: "AliWebDigital" },
      { name: "twitter:site", content: "@AliWebDigital" },
      { name: "twitter:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { name: "twitter:image:alt", content: "AliWebDigital website design and branding showcase" },
    ],
    links: [{ rel: "canonical", href: "https://www.aliwebdigital.in/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title={<>Packages that match real growth goals.</>}
        description="Transparent starting prices for website, app, and digital product development — designed for founders and teams who want a premium build without hidden fees."
      />
      <PricingSection />
      <ContactSection />
    </SiteLayout>
  );
}
