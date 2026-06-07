import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Upload, Loader2, Plus } from "lucide-react";
import {
  listBanners,
  createBanner,
  deleteBanner,
  compressImageToBase64,
  type BannerDoc,
} from "@/lib/cms";

export const Route = createFileRoute("/admin/banners")({
  component: BannersAdmin,
});

function BannersAdmin() {
  const [items, setItems] = useState<BannerDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      setItems(await listBanners());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle) return toast.error("Title and subtitle are required");
    setSaving(true);
    try {
      let imageUrl: string | undefined;
      if (file) {
        imageUrl = await compressImageToBase64(file);
      }
      await createBanner({
        title,
        subtitle,
        tag: tag || "Featured",
        imageUrl,
      });
      setTitle("");
      setSubtitle("");
      setTag("");
      setFile(null);
      toast.success("Banner added");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add banner");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (b: BannerDoc) => {
    if (!confirm(`Delete banner "${b.title}"?`)) return;
    try {
      await deleteBanner(b);
      toast.success("Deleted");
      refresh();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-navy mb-2">
        Banners
      </h1>
      <p className="text-sm text-navy/60 mb-10">
        Manage the carousel slides shown on the homepage.
      </p>

      <form onSubmit={onSubmit} className="border border-navy/10 p-6 bg-white mb-10 grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <h2 className="font-display font-bold uppercase tracking-tight text-navy mb-1 flex items-center gap-2">
            <Plus size={16} /> Add new banner
          </h2>
        </div>
        <Field label="Title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Tag">
          <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Featured · Studio" className={inputCls} />
        </Field>
        <Field label="Subtitle" className="md:col-span-2">
          <textarea rows={2} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={inputCls + " resize-none"} />
        </Field>
        <Field label="Image" className="md:col-span-2">
          <label className="flex items-center gap-3 border border-dashed border-navy/15 px-4 py-3 cursor-pointer hover:bg-navy/5">
            <Upload size={15} className="text-electric" />
            <span className="text-sm text-navy/70">{file ? file.name : "Choose image…"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        </Field>
        <div className="md:col-span-2">
          <button
            disabled={saving}
            className="bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-electric transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving…" : "Add banner"}
          </button>
        </div>
      </form>

      <h2 className="font-display font-bold uppercase tracking-tight text-navy mb-4">
        Current banners
      </h2>
      {loading ? (
        <p className="text-navy/50 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-navy/50 text-sm">No banners yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((b) => (
            <div key={b.id} className="border border-navy/10 bg-white overflow-hidden">
              <div
                className="aspect-[16/8] bg-navy"
                style={{
                  backgroundImage: b.imageUrl
                    ? `linear-gradient(135deg, rgba(10,26,58,0.55), rgba(10,26,58,0.25)), url(${b.imageUrl})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-electric">{b.tag}</p>
                <h3 className="font-display font-bold text-navy mt-1">{b.title}</h3>
                <p className="text-sm text-navy/60 mt-1 line-clamp-2">{b.subtitle}</p>
                <button
                  onClick={() => onDelete(b)}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-red-500 hover:text-red-700"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full border-b border-navy/15 py-2 outline-none focus:border-electric bg-transparent text-navy";

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
      <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
