import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AliWebDigital" },
      {
        name: "description",
        content:
          "AliWebDigital Terms & Conditions explain the rules for using our site and working with our digital services.",
      },
      { property: "og:title", content: "Terms & Conditions — AliWebDigital" },
      { property: "og:url", content: "https://www.aliwebdigital.in/terms" },
      { property: "og:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { property: "og:image:alt", content: "AliWebDigital website design and branding showcase" },
      { property: "og:site_name", content: "AliWebDigital" },
      { name: "twitter:site", content: "@AliWebDigital" },
      { name: "twitter:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { name: "twitter:image:alt", content: "AliWebDigital website design and branding showcase" },
    ],
    links: [{ rel: "canonical", href: "https://www.aliwebdigital.in/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title={<>Terms & Conditions</>}
        description="These terms govern your use of AliWebDigital’s website and services."
      />
      <section className="max-w-5xl mx-auto px-6 py-20 text-navy/90 space-y-8">
        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By using our website and services, you agree to these terms and all applicable laws. If you do not agree, please do not use this site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Service Scope</h2>
          <p className="leading-relaxed">
            AliWebDigital provides web, mobile, branding, and digital product services. Project scope, deliverables, timeline, and pricing are defined in separate proposals or agreements.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Payment Terms</h2>
          <p className="leading-relaxed">
            Payments are due according to the terms agreed in the proposal. We may require a deposit before work begins and final payment on project completion.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Intellectual Property</h2>
          <p className="leading-relaxed">
            Unless otherwise agreed, AliWebDigital retains ownership of design files and source code until full payment is received. Upon payment, ownership is transferred according to the signed agreement.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Limitation of Liability</h2>
          <p className="leading-relaxed">
            AliWebDigital is not liable for indirect damages, lost profits, or third-party claims arising from use of our website or services.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
