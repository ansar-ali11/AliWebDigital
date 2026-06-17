import { createFileRoute } from "@tanstack/react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export const Route =
  createFileRoute("/ebooks/$id")({
    component: EbookDetails,
  });

function EbookDetails() {
  const { id } = Route.useParams();

  const [ebook, setEbook] =
    useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const snap = await getDoc(
      doc(db, "ebooks", id)
    );

    if (snap.exists()) {
      setEbook({
        id: snap.id,
        ...snap.data(),
      });
    }
  }

  if (!ebook)
    return (
      <div className="p-20">
        Loading...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={ebook.coverImage}
          className="w-full rounded-xl"
        />

        <div>
          <h1 className="text-5xl font-bold">
            {ebook.title}
          </h1>

          <p className="mt-2 text-gray-500">
            {ebook.author}
          </p>

          <p className="mt-6">
            {ebook.description}
          </p>

          <h2 className="mt-6 text-3xl font-bold">
            ₹{ebook.price}
          </h2>

          <button
            onClick={() =>
              window.open(
                "YOUR_PHONEPE_LINK",
                "_blank"
              )
            }
            className="mt-8 bg-navy text-white px-8 py-4"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}