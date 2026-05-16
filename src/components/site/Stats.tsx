import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { stats } from "@/data/site";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const num = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.]/g, "");
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, num, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, mv, num]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className="relative py-28 px-6 bg-navy text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 size-[500px] rounded-full bg-electric/15 blur-[140px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-[0.95] max-w-2xl">
            Numbers that quietly do the <span className="text-electric">talking</span>.
          </h2>
          <p className="text-white/50 max-w-sm">
            Five years building products with founders, agencies and creators
            across continents.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy p-8 md:p-10 flex flex-col gap-3">
              <span className="font-display font-bold text-5xl md:text-6xl tracking-tighter text-electric">
                <Counter value={s.value} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
