import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  listEbooks,
  createEbook,
  deleteEbook,
  compressImageToBase64,
  type EbookDoc,
} from "@/lib/cms";

export const Route =
  createFileRoute("/admin/ebooks")({
    component: AdminEbooks,
  });

function AdminEbooks() {
  const [items, setItems] = useState<EbookDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [cover, setCover] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    driveLink: "",
  });

  async function refresh() {
    setLoading(true);

    try {
      const ebooks =
        await listEbooks();

      setItems(ebooks);
    } catch {
      toast.error(
        "Failed to load ebooks"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);

    try {
      let coverImage = "";

      if (cover) {
        coverImage =
          await compressImageToBase64(
            cover
          );
      }

      await createEbook({
        title: form.title,
        author: form.author,
        description:
          form.description,

        price: Number(
          form.price
        ),

        driveLink:
          form.driveLink,

        coverImage,

        previewImages: [],

        active: true,

        featured: false,

        createdAt:
          Date.now(),
      });

      toast.success(
        "Ebook created"
      );

      setForm({
        title: "",
        author: "",
        description: "",
        price: "",
        driveLink: "",
      });

      setCover(null);

      refresh();
    } catch {
      toast.error(
        "Failed to create ebook"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-navy mb-8">
        Ebooks
      </h1>

      <form
        onSubmit={onSubmit}
        className="border border-navy/10 p-6 bg-white mb-10 grid md:grid-cols-2 gap-5"
      >
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
            className={inputCls}
          />
        </Field>

        <Field label="Author">
          <input
            value={form.author}
            onChange={(e) =>
              setForm({
                ...form,
                author:
                  e.target.value,
              })
            }
            className={inputCls}
          />
        </Field>

        <Field
          label="Description"
          className="md:col-span-2"
        >
          <textarea
            rows={4}
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className={
              inputCls
            }
          />
        </Field>

        <Field label="Price">
          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price:
                  e.target.value,
              })
            }
            className={inputCls}
          />
        </Field>

        <Field label="Drive Link">
          <input
            value={
              form.driveLink
            }
            onChange={(e) =>
              setForm({
                ...form,
                driveLink:
                  e.target.value,
              })
            }
            className={inputCls}
          />
        </Field>

        <Field
          label="Cover Image"
          className="md:col-span-2"
        >
          <label className="flex items-center gap-3 border border-dashed border-navy/15 px-4 py-3 cursor-pointer">
            <Upload
              size={15}
            />
            <span>
              {cover
                ? cover.name
                : "Choose cover"}
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setCover(
                  e.target
                    .files?.[0] ??
                    null
                )
              }
            />
          </label>
        </Field>

        <button
          disabled={saving}
          className="bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-widest"
        >
          {saving ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Add Ebook"
          )}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((ebook) => (
            <div
              key={ebook.id}
              className="border p-4"
            >
              {ebook.coverImage && (
                <img
                  src={
                    ebook.coverImage
                  }
                  className="w-full h-48 object-cover mb-3"
                />
              )}

              <h3 className="font-bold">
                {ebook.title}
              </h3>

              <p>
                ₹{ebook.price}
              </p>

              <button
                onClick={() =>
                  deleteEbook(
                    ebook
                  ).then(
                    refresh
                  )
                }
                className="text-red-500 mt-3 flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full border-b border-navy/15 py-2 outline-none";

function Field({
  label,
  children,
  className,
}: any) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-bold uppercase tracking-[0.25em] mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}