import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — AliWebDigital" },
      {
        name: "description",
        content:
          "AliWebDigital refund and cancellation policy explains how we handle service cancellations and payment adjustments.",
      },
      { property: "og:title", content: "Refund & Cancellation Policy — AliWebDigital" },
      { property: "og:url", content: "https://www.aliwebdigital.in/refund-policy" },
      { property: "og:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { property: "og:image:alt", content: "AliWebDigital website design and branding showcase" },
      { property: "og:site_name", content: "AliWebDigital" },
      { name: "twitter:site", content: "@AliWebDigital" },
      { name: "twitter:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { name: "twitter:image:alt", content: "AliWebDigital website design and branding showcase" },
    ],
    links: [{ rel: "canonical", href: "https://www.aliwebdigital.in/refund-policy" }],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title={<>Refund & Cancellation Policy</>}
        description="Clear terms for cancellations and refunds when working with AliWebDigital."
      />
      <section className="max-w-5xl mx-auto px-6 py-20 text-navy/90 space-y-8">
        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Cancellation</h2>
          <p className="leading-relaxed">
            Clients may cancel a project before work begins, subject to the terms agreed in the project proposal. Cancellation fees may apply to cover any work already completed or expenses incurred.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Refunds</h2>
          <p className="leading-relaxed">
            Refund eligibility is determined case-by-case. We offer refunds when a project is canceled before significant work begins or if deliverables do not meet the agreed scope.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Service Deliverables</h2>
          <p className="leading-relaxed">
            Delivered work that has been approved and accepted by the client is not eligible for refund. Any change in project scope may require additional fees.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Contact</h2>
          <p className="leading-relaxed">
            To request a cancellation or refund, email <a href="mailto:alidigitalexpo11@gmail.com" className="text-electric underline">alidigitalexpo11@gmail.com</a> with the project details.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
