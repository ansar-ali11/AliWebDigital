import { Reveal } from "./Reveal";

const pricingPlans = [
  {
    title: "Starter Website",
    price: "₹9,999",
    description:
      "A polished one-page or small business site with clean design, responsive layout, and lead capture for your first digital presence.",
  },
  {
    title: "Business Website",
    price: "₹19,999",
    description:
      "A multi-page business website with service pages, contact and conversion elements, and a professional brand experience.",
  },
  {
    title: "E-commerce Website",
    price: "₹29,999",
    description:
      "A commerce-ready storefront with secure checkout, product listings, and conversion-focused shopping experience.",
  },
  {
    title: "Android App Development",
    price: "₹14,999 onwards",
    description:
      "Native Android app development for startups and growing businesses, with clean UI and reliable performance.",
  },
  {
    title: "iOS App Development",
    price: "₹19,999 onwards",
    description:
      "Native iOS app development designed for premium usability, polished interaction, and App Store readiness.",
  },
];

export function PricingSection() {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="max-w-4xl text-center mx-auto mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-4">
              03 — Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-[0.95]">
              Straightforward pricing for real growth.
            </h2>
            <p className="text-navy/60 mt-6 leading-relaxed">
              Choose the package that matches your needs, then reach out to get a tailored proposal and timeline.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Reveal key={plan.title}>
              <article className="border border-navy/10 rounded-3xl p-10 bg-white shadow-sm hover:shadow-xl transition-shadow h-full">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-navy">
                    {plan.title}
                  </h3>
                  <span className="text-electric font-bold uppercase tracking-[0.2em] text-sm">
                    {plan.price}
                  </span>
                </div>
                <p className="text-navy/70 leading-relaxed">
                  {plan.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
