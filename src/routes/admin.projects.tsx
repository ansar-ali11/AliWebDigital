import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Upload, Loader2, Plus, Globe, ExternalLink } from "lucide-react";
import {
  listProjects,
  createProject,
  deleteProject,
  compressImageToBase64,
  type ProjectDoc,
} from "@/lib/cms";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsAdmin,
});

function ProjectsAdmin() {
  const [items, setItems] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    year: new Date().getFullYear().toString(),
    liveUrl: "",
    tech: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const projects = await listProjects();
      setItems(projects);
      console.log("Loaded projects:", projects); // Debug log
    } catch (e) {
      console.error(e);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  // Function to get a website screenshot using a reliable free API
  const getWebsiteScreenshot = (url: string) => {
    if (!url || url === "#") return null;
    // Using a free screenshot API that actually works
    return `https://image.thum.io/get/width/600/crop/800/${encodeURIComponent(url)}`;
  };

  // Alternative: Use a simple thumbnail service
  const getWebsiteThumbnail = (url: string) => {
    if (!url || url === "#") return null;
    return `https://mini.s-shot.ru/600/?${encodeURIComponent(url)}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return toast.error("Title and description required");
    setSaving(true);
    try {
      let imageUrl: string | undefined;
      
      if (file) {
        // Use uploaded image
        imageUrl = await compressImageToBase64(file);
      } else if (form.liveUrl && form.liveUrl !== "#") {
        // Use website screenshot - try multiple services
        imageUrl = getWebsiteScreenshot(form.liveUrl);
      }
      
      await createProject({
        title: form.title,
        description: form.description,
        category: form.category || "Project",
        year: form.year,
        liveUrl: form.liveUrl || "#",
        tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
        imageUrl,
      });
      setForm({
        title: "",
        description: "",
        category: "",
        year: new Date().getFullYear().toString(),
        liveUrl: "",
        tech: "",
      });
      setFile(null);
      toast.success("Project added");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add project");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (p: ProjectDoc) => {
    if (!confirm(`Delete project "${p.title}"?`)) return;
    try {
      await deleteProject(p);
      toast.success("Deleted");
      refresh();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete");
    }
  };

  const set = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="max-w-5xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-navy mb-2">
        Projects
      </h1>
      <p className="text-sm text-navy/60 mb-10">
        Showcase work delivered to clients. Appears in the “Selected Work” section.
      </p>

      <form onSubmit={onSubmit} className="border border-navy/10 p-6 bg-white mb-10 grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <h2 className="font-display font-bold uppercase tracking-tight text-navy mb-1 flex items-center gap-2">
            <Plus size={16} /> Add new project
          </h2>
        </div>
        
        <Field label="Title">
          <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Category">
          <input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="E-commerce" className={inputCls} />
        </Field>
        <Field label="Year">
          <input value={form.year} onChange={(e) => set("year", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Live URL" className="md:col-span-2">
          <div className="relative">
            <input 
              value={form.liveUrl} 
              onChange={(e) => set("liveUrl", e.target.value)} 
              placeholder="https://example.com" 
              className={inputCls + " pl-8"}
            />
            <Globe size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-navy/40" />
          </div>
          <p className="text-[10px] text-electric/70 mt-1">
            Website screenshot will be auto-generated from this URL
          </p>
        </Field>
        <Field label="Description" className="md:col-span-2">
          <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className={inputCls + " resize-none"} />
        </Field>
        <Field label="Tech (comma separated)" className="md:col-span-2">
          <input value={form.tech} onChange={(e) => set("tech", e.target.value)} placeholder="Next.js, Stripe, Tailwind" className={inputCls} />
        </Field>
        <Field label="OR Upload Custom Image" className="md:col-span-2">
          <label className="flex items-center gap-3 border border-dashed border-navy/15 px-4 py-3 cursor-pointer hover:bg-navy/5">
            <Upload size={15} className="text-electric" />
            <span className="text-sm text-navy/70">{file ? file.name : "Choose image (optional)"}</span>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="hidden" />
          </label>
        </Field>
        <div className="md:col-span-2">
          <button
            disabled={saving}
            className="bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-electric transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving…" : "Add project"}
          </button>
        </div>
      </form>

      <h2 className="font-display font-bold uppercase tracking-tight text-navy mb-4">
        Current projects
      </h2>
      {loading ? (
        <p className="text-navy/50 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-navy/50 text-sm">No projects yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => {
            // Determine image to show
            let displayImageUrl = p.imageUrl;
            
            // If no uploaded image, try to generate from liveUrl
            if (!displayImageUrl && p.liveUrl && p.liveUrl !== "#") {
              displayImageUrl = getWebsiteScreenshot(p.liveUrl);
            }
            
            console.log(`Project ${p.title}:`, { 
              hasImageUrl: !!p.imageUrl, 
              liveUrl: p.liveUrl,
              displayImageUrl 
            });
            
            return (
              <div key={p.id} className="border border-navy/10 bg-white overflow-hidden group">
                <div
                  className="aspect-[4/3] bg-navy relative cursor-pointer"
                  style={{
                    backgroundImage: displayImageUrl
                      ? `linear-gradient(135deg, rgba(10,26,58,0.3), rgba(10,26,58,0.1)), url(${displayImageUrl})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: !displayImageUrl ? "#1a1a2e" : undefined,
                  }}
                  onClick={() => p.liveUrl && p.liveUrl !== "#" && window.open(p.liveUrl, "_blank")}
                >
                  {/* Show placeholder if no image */}
                  {!displayImageUrl && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Globe size={40} className="text-electric/30 mb-2" />
                      <p className="text-xs text-white/40 text-center px-4">
                        {p.liveUrl && p.liveUrl !== "#" ? p.liveUrl.replace(/^https?:\/\//, '') : "No image"}
                      </p>
                    </div>
                  )}
                  
                  {/* Live URL badge */}
                  {p.liveUrl && p.liveUrl !== "#" && (
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] text-electric flex items-center gap-1 z-10">
                      <ExternalLink size={10} />
                      Live
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-electric">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="font-display font-bold text-white mt-1">{p.title}</h3>
                  <p className="text-sm text-white/60 mt-1 line-clamp-2">{p.description}</p>
                  
                  {/* Tech stack */}
                  {p.tech && p.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {p.tech.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-electric/10 text-electric/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/10">
                    {p.liveUrl && p.liveUrl !== "#" && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-electric hover:text-electric/80 transition-colors"
                      >
                        Visit Website <ExternalLink size={12} />
                      </a>
                    )}
                    <button
                      onClick={() => onDelete(p)}
                      className="inline-flex items-center gap-2 text-xs text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full border-b border-navy/15 py-2 outline-none focus:border-electric bg-transparent text-white";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className ?? ""}>
      <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}