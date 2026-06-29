import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { useLocation, Link } from "@tanstack/react-router";
import { useState } from "react";
import { serviceDetails } from "@/data/site";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search || "");
  const slug = params.get("service") || undefined;
  const price = Number(params.get("price") || 0);

  const detail = serviceDetails.find((d) => d.slug === slug) ?? null;

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder for PayU integration. Prepare payload for payment gateway here.
    toast.success("Checkout ready. PayU integration pending — prepared payload.");
    console.log("Checkout payload", { service: slug, price, customer: form });
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Checkout" title={detail ? detail.title : "Checkout"} description={detail ? `Complete your order for ${detail.title}.` : "Complete your order."} />

      <div className="max-w-4xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10">
        <form onSubmit={submit} className="space-y-4">
          <h2 className="text-2xl font-bold">Customer details</h2>
          <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full border p-3 rounded" />
          <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full border p-3 rounded" />
          <input placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="w-full border p-3 rounded" />
          <input placeholder="Address (optional)" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="w-full border p-3 rounded" />

          <button className="bg-navy text-white px-6 py-3 mt-4">Proceed to PayU (placeholder)</button>
        </form>

        <aside className="bg-secondary/10 p-6 rounded-xl">
          <h3 className="text-lg font-bold">Order summary</h3>
          {detail ? (
            <div className="mt-4">
              <p className="font-semibold">{detail.title}</p>
              <p className="text-navy/70">{detail.pricing.label} ₹{detail.pricing.price.toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-navy/70 mt-4">No service selected.</p>
          )}

          <div className="mt-6">
            <p className="font-semibold">Total</p>
            <p className="text-2xl">₹{(price || detail?.pricing.price || 0).toLocaleString()}</p>
          </div>

          <div className="mt-8">
            <Link to="/contact" className="inline-block px-4 py-2 border rounded">Contact Us</Link>
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}
