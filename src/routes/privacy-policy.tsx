import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AliWebDigital" },
      {
        name: "description",
        content:
          "AliWebDigital Privacy Policy explains how we collect, use, and protect your information when you use our website and services.",
      },
      { property: "og:title", content: "Privacy Policy — AliWebDigital" },
      { property: "og:url", content: "https://www.aliwebdigital.in/privacy-policy" },
      { property: "og:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { property: "og:image:alt", content: "AliWebDigital website design and branding showcase" },
      { property: "og:site_name", content: "AliWebDigital" },
      { name: "twitter:site", content: "@AliWebDigital" },
      { name: "twitter:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { name: "twitter:image:alt", content: "AliWebDigital website design and branding showcase" },
    ],
    links: [{ rel: "canonical", href: "https://www.aliwebdigital.in/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy Policy</>}
        description="AliWebDigital is committed to protecting your privacy and handling your data responsibly."
      />
      <section className="max-w-5xl mx-auto px-6 py-20 text-navy/90 space-y-8">
        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Information We Collect</h2>
          <p className="leading-relaxed">
            We collect the information you provide when you contact us, request a quote, or sign up for our services. This may include your name, email address, phone number, company name, and project details.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use your information to respond to your inquiries, prepare proposals, manage projects, and provide customer support. We may also use your contact details to share updates on services and digital product offerings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Cookies and Tracking</h2>
          <p className="leading-relaxed">
            Our website may use cookies and analytics tools to understand site performance and improve user experience. You can disable cookies in your browser settings if you prefer not to be tracked.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Third-Party Services</h2>
          <p className="leading-relaxed">
            We may use third-party services for analytics, hosting, and email delivery. Those providers have their own privacy practices, and we do not control how they handle your data.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">Contact</h2>
          <p className="leading-relaxed">
            For privacy questions, email us at <a href="mailto:alidigitalexpo11@gmail.com" className="text-electric underline">alidigitalexpo11@gmail.com</a>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
