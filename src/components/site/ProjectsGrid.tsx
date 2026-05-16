import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects as fallbackProjects, type Project } from "@/data/site";
import { listProjects } from "@/lib/cms";
import { Reveal } from "./Reveal";

type ProjectLike = Project & { imageUrl?: string };

function ProjectCard({ p, idx }: { p: ProjectLike; idx: number }) {
  return (
    <Reveal delay={idx * 0.05} className={idx % 2 === 1 ? "lg:mt-24" : ""}>
      <a href={p.liveUrl} className="group block">
        <div
          className="relative aspect-[4/5] overflow-hidden mb-6"
          style={{
            background: p.gradient ?? "linear-gradient(135deg, #0a1a3a, #2b7fff)",
            backgroundImage: p.imageUrl
              ? `linear-gradient(135deg, rgba(10,26,58,0.55), rgba(10,26,58,0.25)), url(${p.imageUrl})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!p.imageUrl && <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/80">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
              {p.category} · {p.year}
            </span>
            <div className="size-10 grid place-items-center border border-white/20 group-hover:bg-white group-hover:text-navy transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h4 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
              {p.title}
            </h4>
          </div>
        </div>
        <div className="flex items-start justify-between gap-6">
          <p className="text-navy/70 max-w-md">{p.description}</p>
          <div className="hidden md:flex flex-wrap justify-end gap-1.5 max-w-[40%]">
            {p.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-navy/10 text-navy/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export function ProjectsGrid({ heading = true, limit }: { heading?: boolean; limit?: number }) {
  const [items, setItems] = useState<ProjectLike[]>(fallbackProjects);
  useEffect(() => {
    listProjects()
      .then((rows) => {
        if (rows.length) setItems(rows as unknown as ProjectLike[]);
      })
      .catch(() => {});
  }, []);
  const visible = limit ? items.slice(0, limit) : items;
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-4">
                  02 — Selected Work
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-[0.95] max-w-2xl">
                  Recent <span className="text-electric">projects</span> we're proud of.
                </h2>
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-x-16 lg:gap-y-24">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
