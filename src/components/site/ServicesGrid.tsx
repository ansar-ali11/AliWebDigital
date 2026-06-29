import { services } from "@/data/site";
import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";

export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-32 px-6 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-4">
                  01 — What We Do
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-[0.95]">
                  Services built for <span className="text-electric">growth</span>.
                </h2>
              </div>
              <p className="text-navy/60 max-w-sm">
                Six core capabilities, one obsession with quality. Each engagement
                is led senior‑first.
              </p>
            </div>
          </Reveal>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-navy/10">
          {services.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.05}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug ?? s.title.toLowerCase().replace(/\s+/g, "-") }}
                className={`group relative block p-10 lg:p-12 border-b border-navy/10 lg:border-r transition-colors hover:bg-white h-full ${
                  (i + 1) % 3 === 0 ? "lg:border-r-0" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="text-electric font-display font-bold text-sm tracking-widest">
                    {s.number}
                  </span>
                  <div className="size-10 border border-navy/10 grid place-items-center group-hover:bg-electric group-hover:border-electric transition-colors">
                    <div className="size-2 bg-navy group-hover:bg-white transition-colors" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-2xl uppercase tracking-tight mb-4">
                  {s.title}
                </h3>
                <p className="text-navy/60 leading-relaxed">{s.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
