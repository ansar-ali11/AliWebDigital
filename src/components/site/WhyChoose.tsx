export function WhyChoose() {
  const items = [
    "Affordable Pricing",
    "Custom Website Development",
    "Fast Delivery",
    "Ongoing Support",
    "Modern Technologies",
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-4">
            Why Choose AliWebDigital
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            Trusted digital partners for growth-focused businesses
          </h2>
          <p className="mt-4 text-base md:text-lg text-navy/70 leading-relaxed">
            We combine practical pricing, custom development, rapid delivery, and long-term support so your website launches on time and performs from day one.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-navy/10 bg-white/95 p-6 shadow-[0_24px_90px_-62px_rgba(15,23,42,0.8)] transition hover:-translate-y-1"
            >
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-navy/70">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
