import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AliWebDigital" },
      {
        name: "description",
        content:
          "Start a project with AliWebDigital. Tell us about your goals — we'll reply within one business day.",
      },
      { property: "og:title", content: "Contact — AliWebDigital" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title={<>Let's build something <span className="text-electric">remarkable</span>.</>}
        description="Share your goals, timeline and budget. We'll reply within one business day with concrete next steps."
      />
      <ContactSection />
    </SiteLayout>
  );
}
