import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { serviceDetails } from "@/data/site";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetailsPage,
});

function ServiceDetailsPage() {
  const { slug } = Route.useParams();

  const detail = serviceDetails.find((d) => d.slug === slug);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: detail?.title ?? "",
    message: "",
  });

  if (!detail)
    return (
      <div className="p-20">Service not found.</div>
    );

  function submitEnquiry(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Enquiry submitted — we'll contact you shortly.");
    setForm({ name: "", email: "", phone: "", service: detail?.title ?? "", message: "" });
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Services" title={detail.title} description={detail.longDescription} />

      <div className="max-w-6xl mx-auto py-20 px-6 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">What we include</h2>
          <ul className="list-disc ml-6 mb-6 text-navy/70">
            {detail.features.map((f) => (
              <li key={f} className="mb-2">{f}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mt-6">Delivery Timeline</h3>
          <p className="text-navy/70 mb-6">{detail.deliveryTimeline}</p>

          <h3 className="text-xl font-bold mt-6">Pricing</h3>
          <p className="text-navy/70 mb-6">{detail.pricing.label} ₹{detail.pricing.price.toLocaleString()}</p>

          <h3 className="text-xl font-bold mt-6">FAQs</h3>
          <div className="space-y-4">
            {detail.faqs.map((f) => (
              <details key={f.q} className="bg-background p-4 rounded-md border">
                <summary className="font-semibold">{f.q}</summary>
                <p className="mt-2 text-navy/70">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 flex gap-4">
            <Link
              to={`/checkout?service=${encodeURIComponent(detail.slug)}&price=${detail.pricing.price}`}
              className="inline-flex items-center px-6 py-3 bg-navy text-white font-bold uppercase tracking-widest hover:bg-electric transition-colors"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center px-6 py-3 border border-navy text-navy font-bold uppercase tracking-widest hover:bg-navy hover:text-white transition-colors"
            >
              Request Quote
            </button>
          </div>
        </div>

        <aside className="bg-secondary/10 p-6 rounded-xl">
          <h4 className="text-lg font-bold">Contact</h4>
          <p className="text-navy/70 mt-2">Email: {detail.contact.email}</p>
          {detail.contact.phone && <p className="text-navy/70">Phone: {detail.contact.phone}</p>}

          <div className="mt-6">
            <h5 className="font-semibold mb-2">Quick Enquiry</h5>
            <form id="enquiry-form" onSubmit={submitEnquiry} className="space-y-3">
              <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full border p-3 rounded" />
              <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full border p-3 rounded" />
              <input placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="w-full border p-3 rounded" />
              <input placeholder="Service Required" value={form.service} readOnly className="w-full border p-3 rounded bg-gray-50" />
              <textarea placeholder="Project details" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} className="w-full border p-3 rounded" />
              <div className="flex gap-2">
                <button className="bg-navy text-white px-4 py-2 rounded">Send Enquiry</button>
                <Link to="/contact" className="px-4 py-2 border rounded">Contact Us</Link>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}
