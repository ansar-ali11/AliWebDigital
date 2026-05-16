import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { listSubmissions, deleteSubmission, type SubmissionDoc } from "@/lib/cms";

export const Route = createFileRoute("/admin/submissions")({
  component: SubmissionsAdmin,
});

function SubmissionsAdmin() {
  const [items, setItems] = useState<SubmissionDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      setItems(await listSubmissions());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refresh();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Delete submission?")) return;
    await deleteSubmission(id);
    toast.success("Deleted");
    refresh();
  };

  return (
    <div className="max-w-5xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-navy mb-2">
        Client Submissions
      </h1>
      <p className="text-sm text-navy/60 mb-10">
        Inquiries received from the contact form.
      </p>

      {loading ? (
        <p className="text-sm text-navy/50">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-navy/50">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((s) => (
            <div key={s.id} className="border border-navy/10 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-navy">{s.name}</h3>
                  <p className="text-xs text-navy/60 mt-0.5">
                    <a href={`mailto:${s.email}`} className="hover:text-electric">{s.email}</a>
                    {s.phone ? <> · {s.phone}</> : null}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-electric font-bold mt-2">
                    {s.projectType}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(s.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <p className="text-sm text-navy/80 mt-3 whitespace-pre-wrap">{s.message}</p>
              {s.createdAt && (
                <p className="text-[11px] text-navy/40 mt-3">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
