import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import {
  createPurchaseRequest,
} from "@/lib/cms";

export const Route =
  createFileRoute("/payment-submit")({
    component: PaymentSubmit,
  });

function PaymentSubmit() {

  const [form, setForm] =
    useState({
      ebookId: "",
      ebookTitle: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      transactionId: "",
    });

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createPurchaseRequest({
        ...form,
        status: "pending",
        createdAt: Date.now(),
      });

      toast.success(
        "Payment submitted"
      );

      setForm({
        ebookId: "",
        ebookTitle: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        transactionId: "",
      });
    } catch {
      toast.error(
        "Failed"
      );
    }
  }

  return (
    <div className="max-w-xl mx-auto py-20">

      <h1 className="text-4xl font-bold mb-10">
        Payment Verification
      </h1>

      <form
        onSubmit={submit}
        className="space-y-4"
      >

        <input
          placeholder="Ebook ID"
          value={form.ebookId}
          onChange={(e)=>
            setForm({
              ...form,
              ebookId:e.target.value
            })
          }
          className="w-full border p-3"
        />

        <input
          placeholder="Ebook Title"
          value={form.ebookTitle}
          onChange={(e)=>
            setForm({
              ...form,
              ebookTitle:e.target.value
            })
          }
          className="w-full border p-3"
        />

        <input
          placeholder="Name"
          value={form.customerName}
          onChange={(e)=>
            setForm({
              ...form,
              customerName:e.target.value
            })
          }
          className="w-full border p-3"
        />

        <input
          placeholder="Email"
          value={form.customerEmail}
          onChange={(e)=>
            setForm({
              ...form,
              customerEmail:e.target.value
            })
          }
          className="w-full border p-3"
        />

        <input
          placeholder="Phone"
          value={form.customerPhone}
          onChange={(e)=>
            setForm({
              ...form,
              customerPhone:e.target.value
            })
          }
          className="w-full border p-3"
        />

        <input
          placeholder="Transaction ID"
          value={form.transactionId}
          onChange={(e)=>
            setForm({
              ...form,
              transactionId:e.target.value
            })
          }
          className="w-full border p-3"
        />

        <button className="bg-navy text-white px-8 py-3">
          Submit
        </button>

      </form>
    </div>
  );
}