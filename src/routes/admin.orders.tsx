import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  listPurchaseRequests,
  updatePurchaseStatus,
  type PurchaseRequestDoc,
} from "@/lib/cms";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersAdmin,
});

function OrdersAdmin() {
  const [orders, setOrders] = useState<PurchaseRequestDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  async function refresh() {
    try {
      setLoading(true);

      const data =
        await listPurchaseRequests();

      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function approve(
    order: PurchaseRequestDoc
  ) {
    if (!order.id) return;

    try {
      setProcessing(order.id);

      await updatePurchaseStatus(
        order.id,
        "approved"
      );

      toast.success(
        "Order Approved"
      );

      refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to approve"
      );
    } finally {
      setProcessing(null);
    }
  }

  async function reject(
    order: PurchaseRequestDoc
  ) {
    if (!order.id) return;

    try {
      setProcessing(order.id);

      await updatePurchaseStatus(
        order.id,
        "rejected"
      );

      toast.success(
        "Order Rejected"
      );

      refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to reject"
      );
    } finally {
      setProcessing(null);
    }
  }

  return (
    <div className="max-w-7xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-navy mb-2">
        Orders
      </h1>

      <p className="text-sm text-navy/60 mb-10">
        Manage ebook purchase requests.
      </p>

      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2
            size={16}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-navy/10 p-6 bg-white">
          No purchase requests found.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-navy/10 bg-white p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>
                  <h2 className="font-bold text-lg text-navy">
                    {order.ebookTitle}
                  </h2>

                  <div className="mt-3 space-y-1 text-sm text-navy/70">
                    <p>
                      <strong>Name:</strong>{" "}
                      {order.customerName}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {order.customerEmail}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {order.customerPhone}
                    </p>

                    <p>
                      <strong>Transaction ID:</strong>{" "}
                      {order.transactionId}
                    </p>
                  </div>

                  <div className="mt-4">
                    <StatusBadge
                      status={order.status}
                    />
                  </div>
                </div>

                {order.status ===
                  "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        approve(order)
                      }
                      disabled={
                        processing ===
                        order.id
                      }
                      className="bg-green-600 text-white px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
                    >
                      <CheckCircle size={16} />

                      Approve
                    </button>

                    <button
                      onClick={() =>
                        reject(order)
                      }
                      disabled={
                        processing ===
                        order.id
                      }
                      className="bg-red-600 text-white px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-red-700 disabled:opacity-50"
                    >
                      <XCircle size={16} />

                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status:
    | "pending"
    | "approved"
    | "rejected";
}) {
  if (status === "approved") {
    return (
      <span className="px-3 py-1 text-xs font-bold uppercase bg-green-100 text-green-700">
        Approved
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="px-3 py-1 text-xs font-bold uppercase bg-red-100 text-red-700">
        Rejected
      </span>
    );
  }

  return (
    <span className="px-3 py-1 text-xs font-bold uppercase bg-yellow-100 text-yellow-700">
      Pending
    </span>
  );
}