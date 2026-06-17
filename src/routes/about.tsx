import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Stats } from "@/components/site/Stats";
import { ContactSection } from "@/components/site/ContactSection";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AliWebDigital" },
      {
        name: "description",
        content:
          "AliWebDigital is a premium digital studio focused on craft, performance and lasting partnerships.",
      },
      { property: "og:title", content: "About — AliWebDigital" },
      { property: "og:url", content: "https://www.aliwebdigital.in/about" },
      { property: "og:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { property: "og:image:alt", content: "AliWebDigital website design and branding showcase" },
      { property: "og:site_name", content: "AliWebDigital" },
      { name: "twitter:site", content: "@AliWebDigital" },
      { name: "twitter:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { name: "twitter:image:alt", content: "AliWebDigital website design and branding showcase" },
    ],
    links: [{ rel: "canonical", href: "https://www.aliwebdigital.in/about" }],
  }),
  component: AboutPage,
});

const principles = [
  { n: "01", t: "Craft over speed", d: "We measure twice, ship once. Quality compounds; shortcuts don't." },
  { n: "02", t: "Senior‑first delivery", d: "No hand‑offs to junior teams. The people you meet are the people who build." },
  { n: "03", t: "Design + engineering as one", d: "Motion, performance and accessibility are baked in from the first sketch." },
  { n: "04", t: "Long‑term partners", d: "Most of our clients return. We design relationships, not transactions." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title={<>AliWebDigital is a boutique digital studio built for founders who want exceptional work.</>}
        description="We deliver modern websites, digital products, and brand systems with senior-led craft and a clear focus on business results."
      />

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-6">Our approach</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter leading-tight">
              We treat every project like our own product.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-navy/70 text-lg leading-relaxed">
              <p>
                We started AliWebDigital to build the kind of work we love using —
                fast, beautiful, and quietly intelligent. No bloated processes, no
                generic templates, no junior-led delivery.
              </p>
              <p>
                Whether you need a portfolio site, a marketing presence, an admin
                panel, or a complete brand system, we partner closely with you to
                ship something premium and effective.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-6">Why Choose AliWebDigital</p>
              <div className="space-y-6 text-navy/70 text-lg leading-relaxed">
                <p>
                  We are a senior-led team that focuses on quality, speed, and
                  long-term partnerships. Every project is designed to be scalable,
                  accessible, and aligned with your business goals.
                </p>
                <p>
                  Our clients choose us because we keep processes lean, craft with
                  intent, and deliver digital experiences that feel premium without
                  the premium overhead.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-6">
              {principles.map((p) => (
                <div key={p.n} className="p-10 border border-navy/10 rounded-3xl bg-white shadow-sm">
                  <span className="text-electric font-display font-bold text-sm tracking-widest">
                    {p.n}
                  </span>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight mt-6 mb-3">
                    {p.t}
                  </h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />
      <ContactSection />
    </SiteLayout>
  );
}
