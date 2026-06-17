import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getEbooks } from "@/lib/ebooks";

export const Route = createFileRoute("/ebooks")({
  component: EbooksPage,
});

function EbooksPage() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEbooks();
  }, []);

  async function loadEbooks() {
    try {
      const data = await getEbooks();
      setEbooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20">
        Loading ebooks...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-10">
        Ebooks
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {ebooks.map((ebook) => (
          <div
            key={ebook.id}
            className="border border-navy/10 p-6"
          >
            <h2 className="text-xl font-bold">
              {ebook.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              {ebook.author}
            </p>

            <p className="mt-4">
              ₹{ebook.price}
            </p>

            <p className="mt-3 text-sm">
              {ebook.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}