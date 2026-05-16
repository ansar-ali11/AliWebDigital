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
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
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
        eyebrow="About"
        title={<>A small studio with <span className="text-electric">big</span> ambition.</>}
        description="AliWebDigital is a boutique digital studio building modern websites, brand systems and product interfaces for founders and agencies worldwide."
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
                fast, beautiful and quietly intelligent. No bloated processes, no
                generic templates, no junior‑led delivery.
              </p>
              <p>
                Whether you need a portfolio site, a marketing presence, an admin
                panel or a complete brand system, we partner closely with you to
                ship something genuinely premium.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 border-t border-navy/10">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="p-10 border-b border-navy/10 lg:border-r lg:last:border-r-0 h-full">
                <span className="text-electric font-display font-bold text-sm tracking-widest">{p.n}</span>
                <h3 className="font-display font-bold text-xl uppercase tracking-tight mt-6 mb-3">{p.t}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />
      <ContactSection />
    </SiteLayout>
  );
}
