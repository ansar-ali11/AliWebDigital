const items = [
  "Web Development",
  "Brand Identity",
  "UI / UX Design",
  "Admin Panels",
  "Portfolio Sites",
  "Business Websites",
  "Digital Strategy",
];

export function Marquee() {
  return (
    <div className="border-y border-navy/10 py-8 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            <span className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-navy/15">
              {t}
            </span>
            <span className="size-1.5 rounded-full bg-electric/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
