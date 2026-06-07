import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects as fallbackProjects, type Project } from "@/data/site";
import { listProjects } from "@/lib/cms";
import { Reveal } from "./Reveal";

type ProjectLike = Project & { imageUrl?: string };

function ProjectCard({ p }: { p: ProjectLike }) {
  return (
    <a
      href={p.liveUrl}
      className="group flex-shrink-0 w-[260px] md:w-[300px] block"
      style={{ textDecoration: "none" }}
    >
      <div
        className="relative w-full aspect-[3/4] overflow-hidden mb-4"
        style={{
          background: p.gradient ?? "linear-gradient(135deg, #040d1f, #0a2a6e)",
          backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
            {p.category}
          </span>
          <div className="size-8 grid place-items-center border border-white/20 bg-black/20 group-hover:bg-electric group-hover:border-electric transition-all duration-300">
            <ArrowUpRight size={13} className="text-white" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="font-display font-black text-lg text-white tracking-tight leading-tight">
            {p.title}
          </h4>
          <p className="text-[9px] font-bold uppercase tracking-wider text-white/40 mt-1">
            {p.year}
          </p>
        </div>

        <div className="absolute inset-0 border border-electric/0 group-hover:border-electric/50 transition-all duration-300 pointer-events-none" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {p.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-navy/10 text-navy/50"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

export function ProjectsGrid({ heading = true, limit }: { heading?: boolean; limit?: number }) {
  const [items, setItems] = useState<ProjectLike[]>(fallbackProjects);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    listProjects()
      .then((rows) => {
        if (rows.length) setItems(rows as unknown as ProjectLike[]);
      })
      .catch(() => {});
  }, []);

  const visible = limit ? items.slice(0, limit) : items;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += 0.6;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible]);

  return (
    <section className="py-28 relative overflow-hidden">
      {heading && (
        <Reveal>
          <div className="px-6 max-w-7xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-electric" />
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-navy/40">
                02 — Selected Work
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-[0.92]">
              Projects we're{" "}
              <span className="text-electric">proud</span> of.
            </h2>
          </div>
        </Reveal>
      )}

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-5 will-change-transform px-6"
          style={{ width: "max-content" }}
        >
          {[...visible, ...visible].map((p, i) => (
            <ProjectCard key={`${p.id}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}