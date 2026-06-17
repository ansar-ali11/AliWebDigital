import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";
import { LayoutDashboard, Image as ImageIcon, FolderKanban, Inbox, LogOut, Loader2 } from "lucide-react";
import { ShoppingCart } from "lucide-react";
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · AliWebDigital" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRoot,
});

function AdminRoot() {
  return (
    <AdminAuthProvider>
      <AdminShell />
    </AdminAuthProvider>
  );
}

function AdminShell() {
  const { user, loading, signOutUser } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loading && user && pathname === "/admin") {
      navigate({ to: "/admin/banners" });
    }
  }, [user, loading, pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="animate-spin text-navy" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setSubmitting(true);
            try {
              const { signInWithEmailAndPassword } = await import("firebase/auth");
              const { auth } = await import("@/lib/firebase");
              await signInWithEmailAndPassword(auth, email, password);
            } catch (err) {
              const msg = err instanceof Error ? err.message : "Sign in failed";
              setError(msg.replace("Firebase: ", ""));
            } finally {
              setSubmitting(false);
            }
          }}
          className="w-full max-w-md border border-navy/10 p-10 bg-white"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-electric mb-3">Admin</p>
          <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-navy mb-8">
            Sign in
          </h1>

          <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-navy/15 py-3 outline-none focus:border-electric mb-6 bg-transparent"
          />

          <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-navy/15 py-3 outline-none focus:border-electric mb-8 bg-transparent"
          />

          {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-electric transition-colors disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
          <p className="mt-6 text-[11px] text-navy/50">
            Create the admin user in Firebase Console → Authentication → Users.
          </p>
        </form>
      </div>
    );
  }

  const tabs = [
    { to: "/admin/banners", label: "Banners", icon: ImageIcon },
    { to: "/admin/projects", label: "Projects", icon: FolderKanban },
    { to: "/admin/submissions", label: "Submissions", icon: Inbox },
    {to: "/admin/ebooks",label: "Ebooks",icon: FolderKanban},
    {to: "/admin/orders",label: "Orders",icon: Inbox},
    {to: "/admin/orders",label: "Orders",icon: ShoppingCart},

  ] as const;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-navy/10 p-6 hidden md:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <LayoutDashboard size={18} className="text-electric" />
          <span className="font-display font-bold uppercase tracking-tight text-navy">Admin</span>
        </Link>

        <nav className="flex flex-col gap-1 text-sm">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="flex items-center gap-3 px-3 py-2.5 text-navy/60 hover:text-navy hover:bg-navy/5 transition-colors"
              activeProps={{ className: "text-navy bg-navy/5 font-medium" }}
            >
              <t.icon size={15} />
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-navy/10">
          <p className="text-[11px] text-navy/50 mb-3 truncate">{user.email}</p>
          <button
            onClick={() => signOutUser()}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy/60 hover:text-electric"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <div className="md:hidden flex items-center justify-between mb-6">
          <span className="font-display font-bold uppercase tracking-tight text-navy">Admin</span>
          <button onClick={() => signOutUser()} className="text-xs uppercase">Sign out</button>
        </div>
        <div className="md:hidden flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="px-3 py-2 border border-navy/10 text-xs uppercase tracking-widest"
              activeProps={{ className: "bg-navy text-white border-navy" }}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <Outlet />
      </main>
    </div>
  );
}
